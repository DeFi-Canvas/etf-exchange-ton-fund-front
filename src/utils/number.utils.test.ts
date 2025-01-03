import { describe, expect, test } from 'vitest';
import { formatNumberToUI } from './number';

describe('utils tests', () => {
    describe('formatNumberToUI test', () => {
        test('formatNumberToUI return right formated string', () => {
            expect(formatNumberToUI(1)).toBe('1,00');
            expect(formatNumberToUI(-1)).toBe('-1,00');
            expect(formatNumberToUI(0)).toBe('0,00');
        });
    });
});
