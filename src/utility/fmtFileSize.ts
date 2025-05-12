/* eslint-disable sonarjs/no-nested-conditional */

/** https://en.wikipedia.org/wiki/Byte Byte === B */
const SIZES = ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB'] as const;

export function fmtFileSize(bytes: number, decimalPlaces = 2): string {
    if (bytes === 0) {
        return `0 ${SIZES[0]}`; // Handle 0 bytes specifically
    }

    const isNegative: boolean = bytes < 0; // only in diff file size

    const k = 1024;

    let i = 0;
    let size: number = isNegative
        ? -bytes
        : bytes;

    while (size >= k && i < SIZES.length - 1) {
        size /= k;
        i += 1;
    }

    return i === 0
        ? `${isNegative ? '-' : ''}${size} ${SIZES[i]}`
        : `${isNegative ? '-' : ''}${size.toFixed(decimalPlaces)} ${SIZES[i]}`;
}
