export function getNeedFile(files: readonly string[], allowList: string[]): readonly string[] {
    return files.filter(file => allowList.some(allow => file.toLowerCase().endsWith(allow)));
}
