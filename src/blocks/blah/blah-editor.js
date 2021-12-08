/**
 * BLOCK: Generic Block
 * 
 */

/**
 * WordPress dependencies
 */
import { getBlockDefaultClassName } from '@wordpress/blocks';
import { Component } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import { InspectorControls } from '@wordpress/block-editor';

/**
 * WordPress dependencies
 */
import './blah.scss';
import './blah-editor.scss';


/**
 * Internal dependencies
 */
import metadata from './block.json';

// Init variables
const { name } = metadata;
const blockClassName = getBlockDefaultClassName(name);


class BlahEdit extends Component {
	constructor({attributes, setAttributes}) {
		super( ...arguments );
		this.state = {
		};
	}

	render() {
		const {
			attributes,
			setAttributes
		} = this.props;

		const {
			blockClass
		} = attributes;

		// blockClass won't change so set a default value
		setAttributes({blockClass: blockClassName});

		const inspectorControls = ( 
			<InspectorControls>
			</InspectorControls>
		);

		return (
			<>
			{inspectorControls}
			<div className={blockClass}>
				<div>Backend Placeholder</div>
			</div>
			</>
		);
	}
}
export default BlahEdit;
