/**
 * BLOCK: Lightbox Gallery
 * 
 * The standard I'll be using going forward.
 * 
 * Personally I was thinking too narrowly, trying to use an async function like a sync one.
 * These components are constantly reloaded, once the data is there, populate it.
 */

/**
 * WordPress dependencies
 */
import { getBlockDefaultClassName } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { 
	select,
	useSelect,
} from '@wordpress/data';

// WP's useEffect was giving me so much trouble
import { useEffect } from 'react';

import { 
	InspectorControls, 
	MediaUpload,
	PanelColorSettings,
	getColorObjectByColorValue,
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
import trash from '../block-style/assets/trash.svg';
import left from '../block-style/assets/left.svg';
import right from '../block-style/assets/right.svg';

// Init variables
const { name } = metadata;
const blockClassName = getBlockDefaultClassName(name);

const videoFadeEdit = (props) => {
	const {
		attributes,
		setAttributes,
	} = props;

	const {
		blockClass,
		slides,
	} = attributes;

	// The second [] parameter runs only once
	useEffect(() => {
		setAttributes({blockClass: blockClassName});
	}, []);

	const onChooseMedia = (media) => {
		let newSlides = [...slides];
		for(let i = 0; i < media.length; i++) {
			let type = media[i].type;
			if( type !== 'video' ) continue;
			
			// Only add slide if it isn't already present
			let match = newSlides.find(element => element.id === media[i].id);

			if (typeof match === 'undefined') {
				let freshSlide = {
					'id': media[i].id,
					'url': media[i].url,
				};
				newSlides.push(freshSlide);
			}
		}
		setAttributes({slides: newSlides});
	}

	const onRemove = (index) => {
		let newSlides = [...slides];
		newSlides.splice(index, 1);
		setAttributes({slides: newSlides});
	}

	const onShiftUp = (index) => {
		if(index === 0 || slides.length === 1) {
			return;
		}
		let newSlides           = [...slides];
		let temp                = newSlides[index]; // element to move up
		newSlides[index]        = newSlides[index - 1];
		newSlides[index - 1]    = temp;
		setAttributes({slides: newSlides});
	}

	const onShiftDown = (index) => {
		if(index === slides.length - 1 || slides.length === 1) {
			return;
		}
		let newSlides = [...slides];
		let temp = newSlides[index]; // element to move down
		newSlides[index] = newSlides[index + 1];
		newSlides[index + 1] = temp;

		setAttributes({slides: newSlides});
	}

	return (
		<>
		<div className={blockClass}>
			<MediaUpload 
				multiple={ true }
				onSelect={(val) => { onChooseMedia(val) }}
				render={ ({open}) => {
					return (
						<>
							<div className="title">Video Fade</div>
							<div className="slide-btn button" onClick={ open }>
								Add Media
							</div>
							<div className="info">Hold CTRL or COMMAND to select multiple</div>
						</>
					);
				}}
			/>
			<div className="slider-slides">
				{slides.map((slide, index) => 
					<div className="cell" key={index}>
						<video>
							<source src={slide.url} />
						</video>
						<div className="buttons">
							<div 
								className="button left"
								onClick={ () => onShiftUp(index) }
							>
								<img src={left} />
							</div>

							<div 
								className="button right"
								onClick={ () => onShiftDown(index) }
							>
								<img src={right} />
							</div>

							<div className="button remove-btn"
								onClick={ () => onRemove(index) }
							>
								<img src={trash} />
							</div>
								

						</div>
					</div>
				)}
			</div>
		</div>
		</>
	);
}
export default videoFadeEdit;