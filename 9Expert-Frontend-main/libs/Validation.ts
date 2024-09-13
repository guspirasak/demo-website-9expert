/* eslint-disable @typescript-eslint/no-explicit-any */
export const Validation = (obj: Record<string, any>, callback: Function) => {
    const result: Record<string, boolean | boolean[]> = {};

    for (const key in obj) {
        if (typeof obj[key] !== 'object') {
            const isKeyEmpty = obj[key] === null || obj[key] === undefined || obj[key] == '' || obj[key].toString().trim() == '';
            result['is' + key.slice(0, 1).toUpperCase() + key.slice(1)] = isKeyEmpty;
        }
        
        if (Array.isArray(obj[key])) {
            const isKeyEmpty = obj[key].length === 0;
            if (isKeyEmpty) result['is' + key.slice(0, 1).toUpperCase() + key.slice(1)] = isKeyEmpty
        }

        if (typeof obj[key] === 'object' && !(Array.isArray(obj[key]))) {
            Validation(obj[key], (res: any) => {
                if (res) {
                    result['is' + key.slice(0, 1).toUpperCase() + key.slice(1)] = res;
                }
            })
        }
    }

    const empty = Object.values(result).some((value) => value === true);
    callback(result, empty);
};
