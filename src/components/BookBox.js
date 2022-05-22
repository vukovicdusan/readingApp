import { useContext } from 'react';
import { BooksContext } from '../context/BooksContext';

const BookBox = (props) => {
	const { books, listDispatch } = useContext(BooksContext);

	let bookBox = (
		<div className="[ box ]">
			<p>No books here at the moment milord.</p>
			<h4>You will have to at least wish to read something!</h4>
		</div>
	);

	if (books.length) {
		bookBox = books.map((book) => {
			let bookList =
				props.whatList === 'old' ? book.readIt : book.onWishList;
			return (
				bookList && (
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
							{props.whatList === 'wish' && (
								<button
									onClick={() =>
										listDispatch({
											type: 'REMOVE_WISH',
											payload: book.id,
										})
									}
									className="button-secondary button-small"
								>
									I don't wanna read this
								</button>
							)}
							{props.whatList === 'old' && (
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
							)}
						</div>
					</div>
				)
			);
		});
	}
	return <div className="cluster">{bookBox}</div>;
};

export default BookBox;
