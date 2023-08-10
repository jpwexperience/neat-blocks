/**
 * BLOCK: All Categories
 *
 * Dynamic Block to show all the categories
 */

/**
 * WordPress dependencies
 */
import { getBlockDefaultClassName } from '@wordpress/blocks';
import { Component } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import { 
	InspectorControls,
	MediaUpload,
} from '@wordpress/block-editor';

import {
	PanelBody,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import './edit.scss';

// Init variables
const { name } = metadata;
const blockClassName = getBlockDefaultClassName(name);


class postFeedEdit extends Component {
	constructor({attributes, setAttributes}) {
		super( ...arguments );
		this.state = {
		};
		setAttributes({blockClass: blockClassName});
	}

	render() {
		const {
			attributes,
			setAttributes
		} = this.props;

		const {
			blockClass,
			imageThumb,
		} = attributes;

		const onChooseImage = (media) => {
			let thumb = media.sizes.thumbnail.url;
			let full = media.sizes.full.url;
			let alt = media.alt;
			setAttributes({imageThumb: thumb});
			setAttributes({imageFull: full});
			setAttributes({imageAlt: alt});
		}

		const inspectorControls = ( 
			<InspectorControls>
				<PanelBody title={__('Image Options')}>
					<MediaUpload
						onSelect={(val) => { onChooseImage(val) }}
						render={ ({open}) => {
							return (
								<>
									<div className="button" onClick={ open }>
										Select Image
									</div>
								</>
							);
						}}
					/>
					<br />
					<img style={{marginTop: "1rem"}} src={imageThumb} />
				</PanelBody>
			</InspectorControls>
		);

		return (
			<>
			{inspectorControls}
			<div className={blockClass}>
				<div><b>Image Scroll</b></div>
				<div>Check out the sidebar options.</div>
			</div>
			</>
		);
	}
}
export default postFeedEdit;