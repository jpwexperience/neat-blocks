/**
 * BLOCK: youtube-embed 
 */

/**
 * WordPress dependencies
 */
 import { __ } from '@wordpress/i18n';
 import { registerBlockType } from '@wordpress/blocks';
 
 /**
  * Internal dependencies
  */
 import edit from './edit';
 import metadata from './block.json';
 
 const { 
     name, 
     title,
     description, 
     category, 
     icon,
     keywords,
     attributes 
 } = metadata;
 
 /**
  * Register Gutenberg Block
  *
  * @link https://wordpress.org/gutenberg/handbook/block-api/
  * @param  {string}   name     Block name.
  * @return {?WPBlock}          The block, if it has been successfully registered;
  *                             otherwise 'undefined'.
  */
 registerBlockType( name, {
    title: __(title),
    description: __(description),
    icon: icon, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
    category: category,
    keywords: keywords,
    edit,
    attributes: {
        ...attributes
    },
    save: () => null, // Dynamic Block
 });