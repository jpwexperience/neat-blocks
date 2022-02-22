import {
	RichText
} from '@wordpress/block-editor';

export default function save( { attributes } ) {
    const {
        blockClass,
        imageAlt,
        imageFull,
        bannerSize,
        captionToggle,
        captionCopy,
        captionIcon,
        overlayColor,
        borderColor,
        mobileCaptionCopy,
        isLazyLoad,
    } = attributes;

    let bleedStyle = {};
    
    if( borderColor ) {
        bleedStyle['--overlay-color'] = overlayColor;
        bleedStyle['--border-color'] = borderColor;
    } else {
        bleedStyle['--overlay-color'] = overlayColor;
    }

    const imageFullElement = (isLazy) => {
        if( isLazy ) {
            return (<img className="banner" src={imageFull} alt={imageAlt} loading="lazy" />);
        } else {
            return (<img className="banner" src={imageFull} alt={imageAlt} />);
        }

    }

    return (
        <>
        <div className={bannerSize ? blockClass + ' ' + bannerSize : blockClass} style={bleedStyle}>
            { imageFull ? imageFullElement(isLazyLoad) : '' }
            {captionToggle && 
                <div className="caption">
                    <div className="constraint">
                        <RichText.Content
                            tagName="h1" 
                            className="copy" 
                            value={captionCopy}
                        />
                        {mobileCaptionCopy &&
                            <RichText.Content
                                tagName="h1" 
                                className="mobile-copy" 
                                value={mobileCaptionCopy}
                            />
                        }

                    </div>
                </div> 
            
			}
		</div>
        </>
    );
}
