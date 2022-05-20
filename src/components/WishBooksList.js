import Region from '../UI/Region';
import Wrapper from '../UI/Wrapper';
import { useEffect, useRef } from 'react';

const WishBooksList = () => {
	const booksListRef = useRef();
	/** USEEFFECT FOR SCROLL INTO VIEW FUNCTION */
	useEffect(() => {
		scrollIntoView();
	}, []);

	const scrollIntoView = () => {
		booksListRef.current.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
	};
	let bookBox = (
		<div className="[ box ]">
			<p>No books here at the moment milord.</p>
			<h4>You will have to at least wish to read something!</h4>
		</div>
	);
	return (
		<Region regionId={'old-books-region'}>
			<Wrapper>
				{' '}
				<div ref={booksListRef} className="cluster">
					{bookBox}
				</div>
			</Wrapper>
		</Region>
	);
};

export default WishBooksList;
