//USE THIS TO GIVE ELEMENTS TOP AND BOTTOM PADDING
//ADD ID PROP AND BACKGROUND PROP TO THE REGION IF ANY OF THE CSS SHOULD BE OVERRIDEN
const Region = (props) => {
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
