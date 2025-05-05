export function getDiffStr(a: number, b: number): `${'+' | '-'} ${string}%` {
    const diff_number = 100 * (a - b) / a;
    return `${diff_number < 0 ? '+' : '-'} ${Math.abs(diff_number).toFixed(2).padStart(5)}%`;
}
