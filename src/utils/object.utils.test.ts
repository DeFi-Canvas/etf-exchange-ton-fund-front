import { describe, expect, test } from 'vitest';
import { getKeyO } from './object-utils';

describe('utils tests', () => {
    describe('getKeyO test', () => {
        test('getKeyO equal object', () => {
            const Obj = {
                name: 'Pupa',
                lastName: 'Lupa',
            };

            expect(getKeyO<typeof Obj, keyof typeof Obj>('name')(Obj)).toBe(
                'Pupa'
            );
            expect(getKeyO<typeof Obj, keyof typeof Obj>('lastName')(Obj)).toBe(
                'Lupa'
            );
        });
    });
});
