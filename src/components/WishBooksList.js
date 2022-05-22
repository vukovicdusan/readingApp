import Region from '../UI/Region';
import Wrapper from '../UI/Wrapper';
import { useContext, useEffect, useRef } from 'react';
import { BooksContext } from '../context/BooksContext';
import BookBox from './BookBox';

const WishBooksList = (props) => {
	const { books } = useContext(BooksContext);
	const booksListRef = useRef();

	/** USEEFFECT FOR SCROLL INTO VIEW FUNCTION from BookLists component */
	useEffect(() => {
		props.scrollIntoView(booksListRef);
	}, []);

	return (
		<Region
			regionId={'wish-list-region'}
			regionBackground={'background-secondary'}
		>
			<Wrapper>
				<div className="stack">
					{books.length ? (
						<h4>
							You are <span>never gonna</span> read these books,
							let's face it!
						</h4>
					) : (
						''
					)}
					<div ref={booksListRef}>
						<BookBox whatList={'wish'}></BookBox>
					</div>
				</div>
			</Wrapper>
		</Region>
	);
};

export default WishBooksList;
