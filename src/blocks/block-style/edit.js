/**
 * BLOCK STYLE
 * 
 * Wanted to create a generic style block for customizing how the gutenberg editor looks.
 * This was mainly born from the fact that .wp-block has a default max-width of 850px
 */

/**
 * WordPress dependencies
 */
import { getBlockDefaultClassName } from '@wordpress/blocks';
import { Component } from '@wordpress/element';
import { __ } from '@wordpress/i18n';


/**
 * Internal dependencies
 */
import metadata from './block.json';
import './edit.scss';

// Init variables
const { name } = metadata;
const blockClassName = getBlockDefaultClassName(name);


class BlockStyleEdit extends Component {
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

		return (
			<>
			{inspectorControls}
			<div className={blockClass}>
				<div>This block shows nothing on the frontend</div>
			</div>
			</>
		);
	}
}
export default BlockStyleEdit;
