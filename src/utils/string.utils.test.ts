import { describe, expect, test } from 'vitest';
import { formatCapsToSepareteCamel, formatDateToStr } from './string';

describe('utils tests', () => {
    describe('formatCapsToSepareteCamel test', () => {
        test('formatCapsToSepareteCamel return right formated string', () => {
            expect(formatCapsToSepareteCamel('PUPA-I-LUPA')).toBe(
                'Pupa I Lupa'
            );
            expect(formatCapsToSepareteCamel('PUPA_I_LUPA')).toBe(
                'Pupa_i_lupa'
            );
            expect(formatCapsToSepareteCamel('PUPA I LUPA')).toBe(
                'Pupa i lupa'
            );
            expect(formatCapsToSepareteCamel('pupa i lupa')).toBe(
                'Pupa i lupa'
            );
        });
    });

    describe('formatDateToStr test', () => {
        test('formatDateToStr return right formated string', () => {
            expect(formatDateToStr(new Date('2025-01-03'))).toBe('3 Jan 04:00');
        });
    });
});
