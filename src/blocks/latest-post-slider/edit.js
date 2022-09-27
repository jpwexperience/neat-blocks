/**
 * BLOCK: Latest Post Slider
 *
 * Dynamic Block. Structure takes a lot from core Latest Posts block 
 * https://github.com/WordPress/gutenberg/tree/master/packages/block-library/src/latest-posts
 */

/**
 * WordPress dependencies
 */
import { getBlockDefaultClassName } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

// WP's useEffect was giving me so much trouble
import { useEffect } from 'react';

import { getPagination } from '../../utilities/pagination';

import { 
	InspectorControls, 
	MediaUpload,
	RichText,
	PanelColorSettings,
} from '@wordpress/block-editor';

import {
	PanelBody,
	TextControl,
	ToggleControl,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import './edit.scss';

// Init variables
const { name } = metadata;
const blockClassName = getBlockDefaultClassName(name);

const latestPostSliderEdit = (props) => {
	const {
		attributes,
		setAttributes,
	} = props;

	const {
		blockClass,
	} = attributes;
	
	// The second [] parameter runs only once
	useEffect(() => {
		setAttributes({blockClass: blockClassName});
	}, []);
	
	const inspectorControls = ( 
		<InspectorControls>
		</InspectorControls>
	);
	
	return (
		<>
		{inspectorControls}
		<div className={blockClass}>
			<h2>Latest Post Slider</h2>
		</div>
		</>
	);
} 
export default latestPostSliderEdit;