export default function save( { attributes } ) {
    const {
        blockClass,
        icon,
        link,
    } = attributes;

    return (
        <>
			<div className={blockClass}>
				<div className="container">
                    <a href={link} target="_blank" rel="noopener noreferer">
                        {icon && <img src={icon} alt="simple icon" />}
                    </a>
				</div>
			</div>
        </>
    );
}