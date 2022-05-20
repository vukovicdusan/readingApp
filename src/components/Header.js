import Wrapper from '../UI/Wrapper';
import bookPile from '../assets/css/img/book-pile-2.svg';
const Header = () => {
	return (
		<header>
			<Wrapper>
				<div className="[ wrap ]">
					<div className="logo">
						<img width="55" height="55" src={bookPile} alt="logo" />
					</div>
					<h4>
						Your <span className="text-underline">smart</span>{' '}
						reader app.
					</h4>
				</div>
			</Wrapper>
		</header>
	);
};

export default Header;
