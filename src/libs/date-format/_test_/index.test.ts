import { describe, expect, it } from 'vitest';
import getFormattedDate from '..';

describe('getFormattedDate', () => {
    it('should return Today', () => {
        expect(getFormattedDate(new Date())).toBe('Today');
    });

    it('should return Yesterday', () => {
        expect(
            getFormattedDate(
                new Date(new Date().setDate(new Date().getDate() - 1))
            )
        ).toBe('Yesterday');
    });

    it('should return format date', () => {
        expect(getFormattedDate(new Date('2025-01-01'))).toBe('1 Jan, 2025');
    });
});
