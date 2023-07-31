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

// Init variables
const { name } = metadata;
const blockClassName = getBlockDefaultClassName(name);


class productFeedEdit extends Component {
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
			productIds,
		} = attributes;

		const inspectorControls = ( 
			<InspectorControls>
				<PanelBody title={'Products'}>
					<TextControl 
						label="Product IDs"
						value={productIds}
						help="Comma separated list of product IDs. If empty, first 10 will be displayed."
						onChange={(val) => {setAttributes({productIds: val});}}
					/>
				</PanelBody>
				
			</InspectorControls>
		);

		return (
			<div className={blockClass}>
				{inspectorControls}
				<div><b>Product Slider</b></div>
			</div>
		);
	}
}
export default productFeedEdit;