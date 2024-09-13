/* eslint-disable @typescript-eslint/no-explicit-any */


export const allValuesExist = (arr1: unknown[], arr2: unknown[]): boolean => {
    const set2 = new Set(arr2)
    for (const value of arr1) {
        if (!set2.has(value)) {
            return false
        }
    }
    return true
}

export function removeAll<T>(arr1: T[], arr2: T[]): T[] {
    const filteredArr2 = new Set(arr2)
    filteredArr2.forEach(value => arr1.includes(value) && filteredArr2.delete(value))
    return Array.from(filteredArr2)
}


export const csvFileToArray = (string: string) => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",")
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n")

    const array = csvRows.map((i: string) => {
        const values = i.split(",");
        const obj = csvHeader.reduce((object: { [x: string]: string }, header: string | number, index: any) => {
            object[header.toString().toLowerCase().replace("\r", "")] = values[index]
            return object
        }, {})

        return obj
    });

    return array

};
