/**
 * BLOCK: Latest Post
 *
 * Dynamic Block. Structure takes a lot from core Latest Posts block 
 * https://github.com/WordPress/gutenberg/tree/master/packages/block-library/src/latest-posts
 */

/**
 * WordPress dependencies
 */
import { getBlockDefaultClassName } from '@wordpress/blocks';
import { Component } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import { 
	InspectorControls,
} from '@wordpress/block-editor'

import {
	PanelBody,
	TextControl,
} from '@wordpress/components';
/**
 * Internal dependencies
 */
import metadata from './block.json';
import './edit.scss';

let icons = [
	'/wp-content/plugins/neat-blocks/assets/icons/github.png',
	'/wp-content/plugins/neat-blocks/assets/icons/instagram.png',
	'/wp-content/plugins/neat-blocks/assets/icons/linkedin.png',
	'/wp-content/plugins/neat-blocks/assets/icons/vimeo.png',
];

// Init variables
const { name } = metadata;
const blockClassName = getBlockDefaultClassName(name);


class simpleiconEdit extends Component {
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
			icon,
			link,
		} = attributes;

		const onIconSelect = (index) => {
			if( index === -1 ){
				setAttributes({ icon: '' });
				return;	
			}
			let iconChoice = icons[index];
			setAttributes({ icon: iconChoice });
		};

		const inspectorControls = ( 
			<InspectorControls>
				<PanelBody title={__('Icon Options')}>
					<div className="simple-icons">
						{icons.map((image, index) => 
							<div 
								className="icon-cell"
								onClick={() => onIconSelect(index)}
								key={'icon-' + index}
							>
								<img src={image} />
							</div>
						)}
						<div 
							className="icon-cell cancel"
							onClick={() => onIconSelect(-1)}
						>
							NO ICON
						</div>
					</div>
					<TextControl 
						label="URL"
						value={link}
						onChange={(val) => { setAttributes({link: val}) }} 
					/>
				</PanelBody>
			</InspectorControls>
		);

		return (
			<>
			{inspectorControls}
			<div className={blockClass}>
				<div className="container">
					{icon && <img src={icon} />}
				</div>
			</div>
			</>
		);
	}
}
export default simpleiconEdit;