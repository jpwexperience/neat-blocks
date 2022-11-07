/**
 * BLOCK: Lightbox Gallery
 * 
 * The standard I'll be using going forward.
 * 
 * Personally I was thinking too narrowly, trying to use an async function like a sync one.
 * These components are constantly reloaded, once the data is there, populate it.
 */

/**
 * WordPress dependencies
 */
import { getBlockDefaultClassName } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { 
	select,
	useSelect,
} from '@wordpress/data';

// WP's useEffect was giving me so much trouble
import { useEffect } from 'react';

import { 
	InspectorControls, 
	MediaUpload,
	PanelColorSettings,
	getColorObjectByColorValue,
} from '@wordpress/block-editor';

import {
	PanelBody,
	TextControl,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import './edit.scss';
import trash from '../block-style/assets/trash.svg';
import left from '../block-style/assets/left.svg';
import right from '../block-style/assets/right.svg';

// Init variables
const { name } = metadata;
const blockClassName = getBlockDefaultClassName(name);

const contactFormEdit = (props) => {
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

	return (<>
		<div className={blockClass}>
			<h2>Contact Form</h2>
		</div>
	</>);
}
export default contactFormEdit;