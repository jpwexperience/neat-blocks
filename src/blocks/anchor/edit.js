/**
 * BLOCK: Temp
 */

/**
 * WordPress dependencies
 */
import { getBlockDefaultClassName } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

import { useEffect } from '@wordpress/element';

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

const anchorEdit = (props) => {
	const {
		attributes,
		setAttributes,
	} = props;
	
	const {
		blockClass,
		anchor,
	} = attributes;
	
	// The second [] parameter runs only once
	useEffect(() => {
		setAttributes({blockClass: blockClassName});
	}, []);

	const inspectorControls = ( 
		<InspectorControls>
			<PanelBody title={'Anchor'}>
				<TextControl 
					label="Anchor"
					value={anchor}
					onChange={(val) => {setAttributes({anchor: val})}}
				/>
			</PanelBody>
		</InspectorControls>
	);
	
	return (
		<div className={blockClass}>
			{inspectorControls}
			<h2>Anchor{anchor !== '' || anchor !== undefined ? ` - ${anchor}` : ''}</h2>
		</div>
	);
} 
export default anchorEdit;