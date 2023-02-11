/**
 * General data based functions
 */

/**
 * Get copy of JSON string
 * 
 * @param {String} items 
 * @returns 
 */
export const getDecodedCopy = (items) => {
    let decodedItems = [];
    if( items ) {
        decodedItems = JSON.parse(items);
    }
    return {...decodedItems};
}