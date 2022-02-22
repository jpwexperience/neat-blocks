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
	RichText,
	MediaUpload,
	PanelColorSettings,
} from '@wordpress/block-editor';

import {
	PanelBody,
	RadioControl,
	ToggleControl,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import './edit.scss';
 
let captionIcons = [];

// Init variables
const { name } = metadata;
const blockClassName = getBlockDefaultClassName(name);


class FullBleedBannerEdit extends Component {
	constructor({attributes, setAttributes}) {
		super( ...arguments );
		this.state = {
		};
		const {
			hasOverlay,
			isGrayscale,
			isParallax,
			isImageContain,
		} = attributes;

		let currentBlockClass = blockClassName;
		
		currentBlockClass += hasOverlay ? ' overlay' : '';
		currentBlockClass += isGrayscale ? ' gray' : '';
		currentBlockClass += isParallax ? ' is-parallax' : '';
		currentBlockClass += isImageContain ? ' contain' : '';
		setAttributes({blockClass: currentBlockClass});
	}

	render() {
		const {
			attributes,
			setAttributes
		} = this.props;

		const {
			blockClass,
			imageThumb,
			imageAlt,
			imageFull,
			bannerSize,
			captionToggle,
			captionCopy,
			captionIcon,
			hasOverlay,
			overlayColor,
			isGrayscale,
			isParallax,
			isImageContain,
			borderColor,
			toggleMobileCaption,
			mobileCaptionCopy,
			isLazyLoad,
		} = attributes;

		const modifyToggleBlockClass = (val, selector) => {
			let blockClassCopy = blockClass;
			if( val ) {
				blockClassCopy += ' ' + selector;
			} else {
				blockClassCopy = blockClassCopy.replace(selector, '');
			}
			blockClassCopy = blockClassCopy.replace(/\s+/g, " "); // trim unnecessary whitespace
			setAttributes({blockClass: blockClassCopy});
		}

		const onChooseImage = (media) => {
			let thumb = media.sizes.thumbnail.url;
			let full = media.sizes.full.url;
			let alt = media.alt;
			setAttributes({imageThumb: thumb});
			setAttributes({imageFull: full});
			setAttributes({imageAlt: alt});
		}

		const onIconSelect = (index) => {
			if( index === -1 ){
				setAttributes({ captionIcon: '' });
				return;	
			}
			let captionIconChoice = captionIcons[index];
			setAttributes({ captionIcon: captionIconChoice });
		};

		const setOverlay = (val) => {
			modifyToggleBlockClass(val, 'overlay');
			setAttributes({hasOverlay: val});
		};

		const setGrayscale = (val) => {
			modifyToggleBlockClass(val, 'gray');
			setAttributes({isGrayscale: val});
		}

		const setParallax = (val) => {
			modifyToggleBlockClass(val, 'is-parallax');
			setAttributes({isParallax: val});
		}

		const setImageFit = (val) => {
			modifyToggleBlockClass(val, 'contain');
			setAttributes({isImageContain: val});
		}

		const allowedFormats = [ 'core/bold', 'core/image', 'core/italic', 'core/strikethrough', 'core/underline', 'core/text-color', 'core/link' ];

		const inspectorControls = ( 
			<InspectorControls>
				<PanelBody title={__('Caption Options')}>
					<ToggleControl
						label="Caption"
						help={ captionToggle ? 'Has caption' : 'No caption' }
						checked={ captionToggle }
						onChange={ (val) => { setAttributes({captionToggle: val}); }}
					/>

				</PanelBody>
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
					<br />
					<ToggleControl
						label="Lazy Loading"
						help={ isLazyLoad ? 'Image has lazy attribute' : 'Image does not have lazy attribute' }
						checked={ isLazyLoad }
						onChange={ (val) => { setAttributes({isLazyLoad: val}); }}
					/>
				</PanelBody>
				
				<PanelBody title={__('Size Options')}>
					<RadioControl 
						label="Banner Height"
						selected={bannerSize}
						options={[
							{label: 'Short', value: 'short'},
							{label: 'Regular', value: ''},
							{label: 'Tall', value: 'tall'},
							{label: 'Hero', value: 'hero'},
						]}
						onChange={(val) => setAttributes({bannerSize: val})}
					/>
					<ToggleControl
						label="Image Fit"
						help={ isImageContain ? 'Image is contained' : 'Image is Covered' }
						checked={ isImageContain }
						onChange={ (val) => { setImageFit(val); }}
					/>
				</PanelBody>

				<PanelBody title={__('Overlay Options')}>
					<ToggleControl
						label="Overlay"
						help={ hasOverlay ? 'Has overlay' : 'No overlay' }
						checked={ hasOverlay }
						onChange={ (val) => { setOverlay(val); }}
					/>
					{hasOverlay && 
						<ToggleControl
							label="Grayscale Image"
							help={ isGrayscale ? 'Grayscale' : 'Not grayscale' }
							checked={ isGrayscale }
							onChange={ (val) => { setGrayscale(val); }}
						/>
					}
					{hasOverlay && 					
						<PanelColorSettings
						title="Overlay Color"
						colorSettings={ [
							{
								value: overlayColor,
								onChange: ( val ) => setAttributes({overlayColor: val}),
								label: __( '' ),
							},
						] }
						/>
					}
				</PanelBody>
				<PanelBody title={__('Parallax Options')}>
					<ToggleControl
						label="Parallax"
						help={ isParallax ? 'Is parallax' : 'Is not parallax' }
						checked={ isParallax }
						onChange={ (val) => { setParallax(val); }}
					/>
				</PanelBody>
			</InspectorControls>
		);

		const bleedStyle = {
			'--overlay-color': overlayColor,
			'--border-color': borderColor,
		};

		return (
			<>
			{inspectorControls}
			<div className={blockClass + ' ' + bannerSize} style={bleedStyle}>
				{ imageFull ? <img className="banner" src={imageFull} alt={imageAlt} /> : <img src="http://placehold.it/1366x720" alt="placeholder" /> }
				{captionToggle && 
					<div className="caption">
						<div className="constraint">
							{!toggleMobileCaption && 
								<RichText 
									tagName="h1" 
									className="copy" 
									value={captionCopy} 
									placeholder="Caption title text..."
									allowedFormats={allowedFormats}
									onChange={ (val) => setAttributes({captionCopy: val}) }
								/>
							}
							{toggleMobileCaption && 
								<RichText 
									tagName="h1" 
									className="mobile-copy" 
									value={mobileCaptionCopy} 
									placeholder="Mobile Caption title text..."
									allowedFormats={allowedFormats}
									onChange={ (val) => setAttributes({mobileCaptionCopy: val}) }
								/>
							}

						</div>
					</div> 
				
				}

			</div>
			</>
		);
	}
}
export default FullBleedBannerEdit;