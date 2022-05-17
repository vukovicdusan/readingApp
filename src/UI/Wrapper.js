//UI element used for wrapping page content giving it width, side padding and centering it
const Wrapper = (props) => {
	return (
		<div className="wrapper">
			{props.children}
		</div>
	)
}

export default Wrapper;