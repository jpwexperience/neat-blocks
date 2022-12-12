/**
 * BLOCK: Latest Post Slider
 *
 * Dynamic Block. Structure takes a lot from core Latest Posts block 
 * https://github.com/WordPress/gutenberg/tree/master/packages/block-library/src/latest-posts
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

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
import { 
    useEffect,
    useState,
} from '@wordpress/element';

import { 
	useSelect,
    useDispatch,
} from '@wordpress/data';

import { getDecodedCopy } from '../..';

import { getBlockDefaultClassName } from '@wordpress/blocks';

// Init variables
const { name } = metadata;
const blockClassName = getBlockDefaultClassName(name);

const latestPostSliderEdit = ({attributes, setAttributes}) => {
    const {
        meta,
        meta: { _clip_data },
    } = useSelect((select) => ({
        meta: select('core/editor').getEditedPostAttribute('meta') || {},
    }));
	
	const {
		blockClass,
	} = attributes;

    const { editPost }              = useDispatch('core/editor');
    const [clipData, setClipData]   = useState(_clip_data);

    useEffect(() => {
        editPost({
            meta: {
                ...meta,
                _clip_data: clipData,
            },
        });
    }, [clipData]);
	
	useEffect(() => {
		setAttributes({blockClass: blockClassName});
	}, []);
    
    const selectMedia = (val) => {
		let dataCopy = getDecodedCopy( clipData );
		dataCopy.source = {...val};
		setClipData( JSON.stringify(dataCopy) );
    }
    
	const updateClipData = (value, key) => {
		let dataCopy    = getDecodedCopy( clipData );
		dataCopy[key]   = value;
		setClipData( JSON.stringify(dataCopy) );	
	}
	
	console.log(clipData);
	
	const inspectorControls = ( 
		<InspectorControls>
			<PanelBody title={'Source'}>
				<TextControl 
					label="Mega ID"
					value={clipData ? JSON.parse(clipData)?.megaId : ''}
					onChange={(val) => {updateClipData(val, 'megaId')}}
				/>
				<MediaUpload 
					multiple={false}
					onSelect={(val) => { selectMedia(val) }}
					render={ ({open}) => {
						return (
							<>
								<div className="button" onClick={ open }>
									Add Media
								</div>
							</>
						);
					}}
				/>
			</PanelBody>
		</InspectorControls>
	);
	
	return (
		<>
		{inspectorControls}
		<div className={blockClass}>
			<h2>Clip Source</h2>
		</div>
		</>
	);
} 
export default latestPostSliderEdit;