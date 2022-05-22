import Region from '../UI/Region';
import Wrapper from '../UI/Wrapper';
import { useContext, useEffect, useRef } from 'react';
import { BooksContext } from '../context/BooksContext';
import BookBox from './BookBox';

const OldBooksList = (props) => {
	const { books } = useContext(BooksContext);
	const booksListRef = useRef();

	/** USEEFFECT FOR SCROLL INTO VIEW FUNCTION from BookLists component */
	useEffect(() => {
		props.scrollIntoView(booksListRef);
	}, []);

	return (
		<Region
			regionId={'old-books-region'}
			regionBackground={'background-secondary'}
		>
			<Wrapper>
				<div className="stack">
					{books.length ? (
						<h4>You actually managed to read these books!?</h4>
					) : (
						''
					)}
					<div ref={booksListRef}>
						<BookBox whatList={'old'} />
					</div>
				</div>
			</Wrapper>
		</Region>
	);
};

export default OldBooksList;
