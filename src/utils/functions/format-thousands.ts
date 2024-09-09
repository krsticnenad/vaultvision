/**
 *
 * Formats a number by adding comma separators for better readability.
 * 
 * @param {number | string} number - Number to be formatted
 * @returns {string} - Formatted number
 *
 */
export const formatThousands = (number: number | string): string => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}