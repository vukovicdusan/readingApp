import { useEffect, useState, useRef } from 'react';
import Region from '../UI/Region';

const NewBooksList = () => {
	const booksListRef = useRef();
	const [searchedBook, setSearchedBook] = useState('');
	const [foundBook, setFoundBook] = useState([]);
	const [bookIsLoading, setBookIsLoading] = useState(false);
	const [fetchError, setFetchError] = useState(null);

	const onSearchBookHandler = (e) => {
		e.preventDefault();
		setSearchedBook(e.target.value);
	};

	const searchSubmitHandler = (e) => {
		e.preventDefault();
		fetchBooks();
	};

	const fetchBooks = async () => {
		setBookIsLoading(true);
		try {
			const response = await fetch(
				'http://openlibrary.org/search.json?q=' + searchedBook
			);

			if (!response.ok) {
				throw new Error(
					'Error! I fell down the stairs while fetching your book!'
				);
			}
			const responseData = await response.json();
			const loadedBook = {
				title: responseData.docs[0].title,
				author: responseData.docs[0].author_name[0],
			};
			setFoundBook(loadedBook);
		} catch (error) {
			setFetchError(
				'Error! I fell down the stairs while fetching your book!'
			);
		}
		setBookIsLoading(false);
	};
	/** USEEFFECT FOR SCROLL INTO VIEW FUNCTION */
	useEffect(() => {
		bookBox !== '' && scrollIntoView();
	});

	const scrollIntoView = () => {
		booksListRef.current.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
	};

	let bookBox = '';
	if (
		typeof foundBook.title !== 'undefined' &&
		!bookIsLoading &&
		fetchError === null &&
		searchedBook !== ''
	) {
		bookBox = (
			<div ref={booksListRef} className="box">
				<h4>{foundBook.title}</h4>
				<p>by: {foundBook.author}</p>
			</div>
		);
	} else if (fetchError !== null) {
		bookBox = (
			<div ref={booksListRef} className="box">
				<p className="color-red">{fetchError}</p>
			</div>
		);
	} else {
		bookBox = (
			<div ref={booksListRef} className="box">
				<h4>No books here...</h4>
				<p>You have to search.</p>
			</div>
		);
	}
	return (
		<Region regionId={'new-books-region'}>
			<div className="stack">
				<form action="" className="wrap">
					<div className="input-wrapper">
						<input
							onChange={onSearchBookHandler}
							id="book-name"
							type="text"
						/>
						<label htmlFor="book-name">Book Name</label>
					</div>
					<button onClick={searchSubmitHandler} className="button">
						Search
					</button>
				</form>
				{bookIsLoading && (
					<div className="loader-container">
						<p>Lifting heavy things</p>
						<span className="three-dots"></span>
					</div>
				)}

				{bookBox}
			</div>
		</Region>
	);
};

export default NewBooksList;
