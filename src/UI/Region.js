const Region = (props) => {
	//region UI element giving component a top and bottom padding
	//class for the region component if some of the properties have to be overriden.
	let regionId = '';
	if (typeof props.regionId !== 'undefined') {
		regionId = props.regionId;
	} else {
		regionId = '';
	}
	return (
		<article id={regionId} className={'region ' + props.regionBackground}>
			{props.children}
		</article>
	);
};

export default Region;
