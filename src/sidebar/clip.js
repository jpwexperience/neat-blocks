/**
 * Homepage Video Banner 
 * 
 */

import { __ } from '@wordpress/i18n';
import { registerPlugin } from '@wordpress/plugins';
import { PluginSidebar } from '@wordpress/edit-post';
import { 
    TextControl, 
    TextareaControl,
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

const postType = window.pagenow;

const clipSidebar = () => {
    const {
        meta,
        meta: { _clip_data },
    } = useSelect((select) => ({
        meta: select('core/editor').getEditedPostAttribute('meta') || {},
    }));

    const { editPost, savePost }    = useDispatch('core/editor');
    const [clipData, setClipData]   = useState(_clip_data);

    useEffect(() => {
        if( !clipData ) return;
        editPost({
            meta: {
                ...meta,
                _clip_data: clipData,
            },
        });
    }, [clipData]);
    
    const getDecodedCopy = (items) => {
		let decodedItems = [];
		if( items ) {
			decodedItems = JSON.parse(items);
		}
		return {...decodedItems};
	}
    
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
    
    return (
        <PluginSidebar className="neat-clip-sidebar" name="neat-clip-sidebar" title="CLIP">
            <PanelBody title={'General'}>
                <TextControl
                    label="Mega ID"
                    value={clipData && JSON.parse(clipData).megaId}
                    onChange={ (val) => setData('megaId', val) }
                />
            </PanelBody>
        </PluginSidebar>
    );
};

if( postType === 'clip' ) {
    registerPlugin('neat-clip', {
        render: clipSidebar,
        icon: 'format-video',
    });
}