import { describe, it, expect, vi } from 'vitest';
import { runEffects, tap } from '@most/core';
import { newDefaultScheduler } from '@most/scheduler';
import { right, left } from 'fp-ts/lib/Either';
import * as t from 'io-ts';
import axios from 'axios';
import { Stream } from '@most/types';
import { getRequestGenerated } from '../request.utils';

vi.mock('axios');

describe('getRequestGenerated', () => {
    const User = t.type({
        id: t.number,
        name: t.string,
    });

    async function collectEvents<T>(stream: Stream<T>): Promise<T[]> {
        const events: T[] = [];
        await runEffects(
            tap((event) => events.push(event), stream),
            newDefaultScheduler()
        );
        return events;
    }

    it('should return transformed data when the request succeeds and validation passes', async () => {
        const mockData = { id: 1, name: 'Pupa' };
        const request = vi
            .mocked(axios.get)
            .mockResolvedValueOnce({ data: mockData })('/user');

        const stream = getRequestGenerated(
            //@ts-ignore
            request,
            User,
            (data) => ({ userId: data.id, userName: data.name })
        )<unknown>();

        const events = await collectEvents(stream);

        expect(events[0]).toEqual(
            right({ userId: mockData.id, userName: 'Pupa' })
        );
    });

    it('should return data when the request succeeds and validation passes', async () => {
        const mockData = { id: 1, name: 'Pupa' };
        const request = vi
            .mocked(axios.get)
            .mockResolvedValueOnce({ data: mockData })('/user');

        const stream = getRequestGenerated(
            //@ts-ignore
            request,
            User
        )<unknown>();

        const events = await collectEvents(stream);

        expect(events[0]).toEqual(right({ id: mockData.id, name: 'Pupa' }));
    });

    it('should return transformed array data when the request succeeds and validation passes', async () => {
        const mockData = [
            { id: 1, name: 'Pupa' },
            { id: 2, name: 'Lupa' },
        ];
        const request = vi
            .mocked(axios.get)
            .mockResolvedValueOnce({ data: mockData })('/user');

        const stream = getRequestGenerated(
            //@ts-ignore
            request,
            t.array(User),
            (data) =>
                data.map((user) => ({ userId: user.id, userName: user.name }))
        )<unknown>();

        const events = await collectEvents(stream);

        expect(events[0]).toEqual(
            right([
                { userId: 1, userName: 'Pupa' },
                { userId: 2, userName: 'Lupa' },
            ])
        );
    });

    it('should return validation error when data does not match the schema', async () => {
        const mockData = { id: 1, Name: 'Pupa' };
        const request = vi
            .mocked(axios.get)
            .mockResolvedValueOnce({ data: mockData })('/user');

        const stream = getRequestGenerated(
            //@ts-ignore
            request,
            User
        )<unknown>();

        const events = await collectEvents(stream);

        expect(events[0]).toEqual(left('error'));
    });

    it('should apply custom validation function and return its result', async () => {
        const validData = { id: 1, name: 'John Doe' };
        const request = vi
            .mocked(axios.get)
            .mockResolvedValueOnce({ data: validData })('/user');

        const customValidation = (data: t.TypeOf<typeof User>) =>
            data.id > 0 ? right(data) : left('Invalid ID');

        const stream = getRequestGenerated(
            //@ts-ignore
            request,
            User,
            undefined,
            customValidation
        )<unknown>();

        const events = await collectEvents(stream);

        expect(events[0]).toEqual(right(validData));
    });

    it('should return error when promise rejects', async () => {
        const request = vi
            .mocked(axios.get)
            .mockResolvedValueOnce(new Error('Network Error'))('/user');

        const stream = getRequestGenerated(
            //@ts-ignore
            request,
            User
        )<unknown>();

        const events = await collectEvents(stream);

        expect(events[0]).toEqual(left('error'));
    });
});
