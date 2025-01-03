import { describe, expect, test } from 'vitest';
import { getKeyO } from './object-utils';
import { formatNumberToUI } from './number';
import { formatCapsToSepareteCamel, formatDateToStr } from './string';

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

    describe('formatNumberToUI test', () => {
        test('formatNumberToUI return right formated string', () => {
            expect(formatNumberToUI(1)).toBe('1,00');
            expect(formatNumberToUI(-1)).toBe('-1,00');
            expect(formatNumberToUI(0)).toBe('0,00');
        });
    });

    describe('formatCapsToSepareteCamel test', () => {
        test('formatCapsToSepareteCamel return right formated string', () => {
            expect(formatCapsToSepareteCamel('PUPA-I-LUPA')).toBe(
                'Pupa I Lupa'
            );
            expect(formatCapsToSepareteCamel('PUPA_I_LUPA')).toBe(
                'Pupa_i_lupa'
            );
        });
    });

    describe('formatDateToStr test', () => {
        test('formatDateToStr return right formated string', () => {
            expect(formatDateToStr(new Date('2025-01-03'))).toBe('3 Jan 04:00');
        });
    });
});
