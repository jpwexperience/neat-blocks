/**
 * BLOCK: Video Source
 */

/**
 * WordPress dependencies
 */
import { getBlockDefaultClassName } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { 
	useDispatch,
	useSelect,
} from '@wordpress/data';

import { 
	useState, 
	useEffect, 
} from '@wordpress/element';

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

const videoSourceEdit = (props) => {
	const {
		meta,
		meta: { _clip_data },
	} = useSelect((select) => ({
		meta: select('core/editor').getEditedPostAttribute('meta') || {},
	}));
	
	const { editPost } = useDispatch('core/editor');
	
	const [clipData, setClipData] = useState(_clip_data); // JSON
	
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
	
	useEffect(() => {
		editPost({
			meta: {
				...meta,
				_clip_data: clipData,
			},
		});
		if( !clipData ) setClipData('')
	}, [clipData]);
	
	const setClipMeta = ( key, value ) => {
		let copy    = clipData ? JSON.parse(clipData) : {};
		copy[key]   = value;
		setClipData(JSON.stringify(copy));
	}

	const inspectorControls = (<InspectorControls>
		<PanelBody title={__('Source')}>
			<TextControl 
				label="Source time baby"
				value={clipData ? JSON.parse(clipData).source : ''}
				onChange={(val) => {setClipMeta('source', val)}}
			/>
		</PanelBody>
	</InspectorControls>);

	return (<>
		{inspectorControls}
		<div className={blockClass}>
			<h2>Video Source</h2>	
			<p>Check sidebar for options</p>
		</div>
	</>);
}
export default videoSourceEdit;