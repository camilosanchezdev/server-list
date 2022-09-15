export function sortArrayby(arr: Array<any>, param: string, revert: boolean) {
    return arr.sort((a: any, b: any) => {
        if (a[param] < b[param]) { return revert ? -1 : 1; }
        if (a[param] > b[param]) { return revert ? 1 : -1; }
        return 0;
    })
}