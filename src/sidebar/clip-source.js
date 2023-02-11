/**
 * Clip Source
 */

import { __ } from '@wordpress/i18n';
import { registerPlugin } from '@wordpress/plugins';
import { PluginSidebar } from '@wordpress/edit-post';
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

import { getDecodedCopy } from '../utilities/data';

const clipSourceSidebar = () => {
    const {
		meta,
		meta: { _clip_data },
	} = useSelect((select) => ({
		meta: select('core/editor').getEditedPostAttribute('meta') || {},
	}));
	
    //const [clipData, setClipData] = useState(_clip_data ?? '');
    const [clipData, setClipData] = useState(_clip_data ?? '');
    const { editPost } = useDispatch('core/editor');
    
    /**
     * Set data value
     * 
     * @param {string} key 
     * @param {mixed} value 
     */
    const setData = (key, value) => {
        const dataCopy  = getDecodedCopy( clipData );
        dataCopy[key]   = value;
        setClipData( JSON.stringify(dataCopy) );
    }
    
    useEffect(() => {
		editPost({
			meta: {
				...meta,
				_clip_data: clipData,
			},
		});
	}, [clipData]);
 
    return (<PluginSidebar className="clip-source" name="clip-source" title="Clip Source">
        <PanelBody title={'Mega.nz'}>
            <TextControl 
                label="Clip ID"
                value={clipData && JSON.parse(clipData).megaId}
                onChange={ (val) => setData('megaId', val) }
            />
        </PanelBody>
    </PluginSidebar>);
}

const postType = window.pagenow;
if( postType === 'clip' ) {
	registerPlugin('clip-source', {
		render: clipSourceSidebar,
		icon: 'format-video',
	});
}