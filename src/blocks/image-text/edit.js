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

const imageTextEdit = (props) => {
	const {
		attributes,
		setAttributes,
	} = props;
	
	const {
		blockClass,
		content,
		imageThumbnail,
	} = attributes;

	const onChooseImage = (media) => {
		setAttributes({
			imageThumbnail: media.sizes.thumbnail.url,
			imageId: media.id,
		})
	}
	
	// The second [] parameter runs only once
	useEffect(() => {
		setAttributes({blockClass: blockClassName});
	}, []);

	const inspectorControls = ( 
		<InspectorControls>
			<PanelBody title={'Info'}>
				<TextControl 
					label="Content"
					value={content}
					onChange={(val) => {setAttributes({content: val})}}
				/>
				<MediaUpload
					onSelect={(val) => { onChooseImage(val) }}
					render={ ({open}) => {
						return (
							<div className="button" onClick={ open }>
								Select Image
							</div>
						);
					}}
				/>
				<br />
				<img style={{marginTop: "1rem"}} src={imageThumbnail} />
			</PanelBody>
		</InspectorControls>
	);
	
	return (
		<div className={blockClass}>
			{inspectorControls}
			<h2>Image Text</h2>
		</div>
	);
} 
export default imageTextEdit;