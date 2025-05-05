export function math_sum(arr: number[]): number {
    let sum = 0;
    const len = arr.length;
    for (let i = 0; i < len; i += 1) {
        sum += arr[i];
    }
    return sum;
}
