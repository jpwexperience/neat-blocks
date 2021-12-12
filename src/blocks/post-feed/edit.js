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
			blockClass
		} = attributes;

		const inspectorControls = ( 
			<InspectorControls>
			</InspectorControls>
		);

		return (
			<>
			{inspectorControls}
			<div className={blockClass}>
				<div><b>Post Feed</b></div>
				<div>Check out the sidebar options.</div>
			</div>
			</>
		);
	}
}
export default postFeedEdit;