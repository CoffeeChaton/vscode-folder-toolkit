// fileUtils.test.ts
import { describe, expect, it } from 'vitest';
import { fmtFileSize } from './fmtFileSize';

describe('fmtFileSize', () => {
    it('should format 0 bytes correctly', () => {
        expect(fmtFileSize(0)).toBe('0 Bytes');
        expect(fmtFileSize(0, 0)).toBe('0 Bytes');

        expect(fmtFileSize(1)).toBe('1.00 Bytes');
        expect(fmtFileSize(500)).toBe('500.00 Bytes');
        expect(fmtFileSize(1023)).toBe('1023.00 Bytes');
        expect(fmtFileSize(1023, 0)).toBe('1023 Bytes');
        expect(fmtFileSize(500.123, 2)).toBe('500.12 Bytes');
        expect(fmtFileSize(500.129, 2)).toBe('500.13 Bytes');

        expect(fmtFileSize(1024)).toBe('1.00 KiB');
        expect(fmtFileSize(1024, 0)).toBe('1 KiB');
        expect(fmtFileSize(1500)).toBe('1.46 KiB'); // 1500 / 1024 = 1.4648...
        expect(fmtFileSize(1500, 3)).toBe('1.465 KiB');
        expect(fmtFileSize(1024 * 500)).toBe('500.00 KiB');
        expect(fmtFileSize(1024 * 1023.999)).toBe('1024.00 KiB'); // Almost 1 MiB, but still KiB after rounding

        const MiB = 1024 * 1024;
        expect(fmtFileSize(MiB)).toBe('1.00 MiB');
        expect(fmtFileSize(MiB, 1)).toBe('1.0 MiB');
        expect(fmtFileSize(MiB * 1.5)).toBe('1.50 MiB');
        expect(fmtFileSize(MiB * 1023)).toBe('1023.00 MiB');

        const GiB = 1024 ** 3;
        expect(fmtFileSize(GiB)).toBe('1.00 GiB');
        expect(fmtFileSize(GiB * 2.75, 2)).toBe('2.75 GiB');

        const TiB = 1024 ** 4;
        expect(fmtFileSize(TiB)).toBe('1.00 TiB');

        const PiB = 1024 ** 5;
        expect(fmtFileSize(PiB)).toBe('1.00 PiB');

        expect(fmtFileSize(1500, 0)).toBe('1 KiB'); // 1.46... KiB rounded to 0 decimal places
        expect(fmtFileSize(1500, 1)).toBe('1.5 KiB');
        expect(fmtFileSize(1500, 2)).toBe('1.46 KiB');
        expect(fmtFileSize(1500, 5)).toBe('1.46484 KiB');
        expect(fmtFileSize(1024 * 1.000001, 3)).toBe('1.000 KiB'); // Test precision

        expect(fmtFileSize(-1)).toBe('-1.00 Bytes');
        expect(fmtFileSize(-1500)).toBe('-1.46 KiB');
        expect(fmtFileSize(-1024 * 1024 * 2.5, 1)).toBe('-2.5 MiB');
        expect(fmtFileSize(-0, 0)).toBe('0 Bytes'); // -0 is treated as 0
    });
});
