/**
 * Import Blocks
 *
 * Import the main JavaScript file for each enabled block. 
 */

import './utilities/pagination';
import './blocks/full-bleed-banner/index';
import './blocks/video-fade/index';
import './blocks/post-feed/index';
import './blocks/latest-post-slider/index';
import './blocks/contact-form/index';
import './blocks/clip-source/index';

import './sidebar/clip';
    
export const getDecodedCopy = (items) => {
    let decodedItems = [];
    if( items ) {
        decodedItems = JSON.parse(items);
    }
    return {...decodedItems};
}
