
/**
 * Video Source Metabox
 */

import { __ } from '@wordpress/i18n';
import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { 
	TextControl, 
	PanelBody,
} from '@wordpress/components';

import { 
	useState, 
	useEffect, 
} from '@wordpress/element';

import {	
	useSelect,
	useDispatch,
} from '@wordpress/data';

import {
	MediaUpload
} from '@wordpress/block-editor';

import { getDecodedCopy } from '../utilities/data';

const videoSourceMeta = () => {
	const {
		meta,
		meta: { _video_source },
	} = useSelect((select) => ({
		meta: select('core/editor').getEditedPostAttribute('meta') || {},
	}));
	
	const { editPost } = useDispatch('core/editor');
	
	const [ videoSource, setVideoSource ] = useState( _video_source );
	
	useEffect(() => {
		editPost({
			meta: {
				...meta,
				_video_source: videoSource,
			},
		});
	}, [videoSource]);
	
	/**
     * Set data value
     * 
     * @param {string} key 
     * @param {mixed} value 
     */
	const setData = (data) => {
		const videoCopy  = getDecodedCopy( videoSource );
		for( const key in data ) {
			videoCopy[key]   = data[key];
		}
		setVideoSource( JSON.stringify(videoCopy) );
	}
	
	const onAddVideo = (val) => {
		setData({
			url: val.url,
			filename: val.filename,
		});
	}
	   
    return (
		<PluginDocumentSettingPanel name="video-source" title="Video Source">
			<div className="components-panel__body is-opened">
				<MediaUpload
					onSelect={onAddVideo}
					render={ ({open}) => {
						return (
							<div className="button add-video" onClick={ open }>
								Select Video
							</div>
						);
					}}
				/>
				{videoSource && <p>{JSON.parse(videoSource).filename}</p>}
			</div>
		</PluginDocumentSettingPanel>
	);
}

const postType = window.pagenow;
if( postType === 'clip' ) {
	registerPlugin('video-source', {
		render: videoSourceMeta,
		icon: 'format-video',
	});
}