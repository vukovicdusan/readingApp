import Wrapper from '../UI/Wrapper'
import bookPile from '../assets/css/img/book-pile.svg'
const Header = () => {
	return (
		<header>
			<Wrapper>
				<div className="wrap">
					<div className="logo">
						<img width="55" height="55" src={bookPile} alt="logo" />
					</div>
					<nav>
						<ul className="wrap"></ul>
					</nav>
				</div>
			</Wrapper>
		</header>
	)
}

export default Header
