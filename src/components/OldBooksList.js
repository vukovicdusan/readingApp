import Region from '../UI/Region';
import Wrapper from '../UI/Wrapper';
import { useContext, useEffect, useRef } from 'react';
import { BooksContext } from '../context/BooksContext';

const OldBooksList = (props) => {
	const { books, listDispatch } = useContext(BooksContext);
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
			<h4>You will have to start reading one day!</h4>
		</div>
	);

	if (books.length) {
		bookBox = books.map((book) => {
			return (
				book.readIt && (
					<div
						key={book.id}
						className="[ book-box ] [ box ] [ stack ]"
					>
						<div className="stack">
							<h4>{book.title}</h4>
							<p>
								by the author:{' '}
								<span className="text-bold">{book.author}</span>
							</p>
							<p>
								Year of publishing:{' '}
								<span className="text-bold">
									{book.published}
								</span>
							</p>
						</div>

						<div className="stack">
							<button
								onClick={() =>
									listDispatch({
										type: 'REMOVE_BOOK',
										payload: book.id,
									})
								}
								className="button-secondary button-small"
							>
								Didn't read this
							</button>
						</div>
					</div>
				)
			);
		});
	}
	console.log(books);
	return (
		<div className="[ full-bleed ] [ margin-top-3 ]">
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
						<div ref={booksListRef} className="cluster">
							{bookBox}
						</div>
					</div>
				</Wrapper>
			</Region>
		</div>
	);
};

export default OldBooksList;
