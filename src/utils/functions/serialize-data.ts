/**
 *
 * Serializes non-serializable data types into a format that can be stored
 * and transimtted in a Redux store.
 *
 * - Converts `BigInt` into strings
 * - Converts `Date` objects to `ISO` string format
 * - Converts `undefined` to a `null`
 * - Recursively serializes `arrays` and `objects`
 *
 * @param {any} data - Data to be serialized
 * @returns {string | null | [] | {}} - Serialized data
 *
 */
export const serializeData = (data: any): string | null | [] | {} => {

    if (typeof data === 'bigint') return data.toString();

    if (data instanceof Date) data.toISOString();

    if (typeof data === 'undefined') return null;

    if (Array.isArray(data)) return data.map(serializeData);

    if (data !== null && typeof data === 'object') {
        return Object.keys(data).reduce((acc, key) => {
            acc[key] = serializeData(data[key]);
            return acc;
        }, {} as Record<string, any>);
    }
    
    return data;
}