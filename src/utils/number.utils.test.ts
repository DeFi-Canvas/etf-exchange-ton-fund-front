import { describe, expect, test } from 'vitest';
import { formatNumberExponent, formatNumberToUI } from './number';

describe('utils tests', () => {
    describe('formatNumberToUI test', () => {
        test('formatNumberToUI return right formated string', () => {
            expect(formatNumberToUI(1)).toBe('1,00');
            expect(formatNumberToUI(-1)).toBe('-1,00');
            expect(formatNumberToUI(0)).toBe('0,00');
        });
    });

    describe('formatNumberExponent test', () => {
        test('formatNumberExponent normal numbers', () => {
            expect(formatNumberExponent(1)).toBe('1.00');
            expect(formatNumberExponent(100)).toBe('100.00');
            expect(formatNumberExponent(100.123)).toBe('100.123');
            expect(formatNumberExponent(100.001)).toBe('100.001');
        });

        test('formatNumberExponent normal float numbers', () => {
            expect(formatNumberExponent(0.001)).toBe('0.001');
            expect(formatNumberExponent(0.00001)).toBe('0.00001');
            expect(formatNumberExponent(0.000001)).toBe('0.00...1');
            expect(formatNumberExponent(0.000000001)).toBe('0.00...1');
            expect(formatNumberExponent(0.00000000123)).toBe('0.00...123');
            expect(formatNumberExponent(0.000000000000000000123)).toBe(
                '0.00...123'
            );
        });
    });
});
