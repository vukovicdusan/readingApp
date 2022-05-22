import { useContext, useState } from 'react';
import { BooksContext } from '../context/BooksContext';

const BookBox = (props) => {
	const { books, listDispatch } = useContext(BooksContext);
	const [dropdownOpen, setDropdownOpen] = useState('');
	const [memoState, setMemoState] = useState('');

	const onMemoInputHandler = (e) => {
		setMemoState(e.target.value);
	};

	const onDropdownHandler = (id) => {
		dropdownOpen === '' ? setDropdownOpen(id) : setDropdownOpen('');
	};

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
								<div className="stack">
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
									<button
										onClick={() =>
											listDispatch({
												type: 'WISH_COME_TRUE',
												payload: book.id,
											})
										}
										className="button-secondary button-small"
									>
										I finished it!
									</button>
								</div>
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

							<button
								onClick={() => onDropdownHandler(book.id)}
								className={
									dropdownOpen === book.id
										? '[ button-small ] [ button-secondary ] [ dropdown-open ]'
										: '[ button-small ] [ button-secondary ] [ dropdown-closed ]'
								}
							>
								Message to myself
							</button>
							<div className="dropdown">
								<form action="" className="stack">
									{/* <label htmlFor="memo">Message</label> */}
									<textarea
										onChange={onMemoInputHandler}
										name="memo"
										id="memo"
										cols="30"
										rows="5"
										defaultValue={book.memo && book.memo}
									></textarea>
									<button
										onClick={(e) => {
											e.preventDefault();
											listDispatch({
												type: 'ADD_MEMO',
												payload: {
													id: book.id,
													message: memoState,
												},
											});
										}}
										className="button-secondary button-small"
									>
										Save
									</button>
								</form>
							</div>
						</div>
					</div>
				)
			);
		});
	}
	console.log(books);
	return <div className="cluster">{bookBox}</div>;
};

export default BookBox;
