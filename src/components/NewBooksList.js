import { useEffect, useRef, useReducer } from 'react';
import fetchBooksReducer from '../reducers/fetchBooksReducer';
import Region from '../UI/Region';

const reducerInit = {
	searchedBook: '',
	foundBook: {},
	bookIsLoading: false,
	fetchError: null,
	searchValid: false,
	touched: false,
	bookFetched: false,
};

const NewBooksList = () => {
	const booksListRef = useRef();

	const [bookState, dispatch] = useReducer(fetchBooksReducer, reducerInit);

	const onSearchBookHandler = (e) => {
		dispatch({
			type: 'SEARCH',
			payload: e.target.value,
		});
	};

	const onBlurHandler = () => {
		dispatch({
			type: 'BLUR',
		});
	};

	const searchSubmitHandler = (e) => {
		e.preventDefault();

		dispatch({
			type: 'SUBMIT',
		});

		bookState.searchValid && fetchBooks();
	};

	const fetchBooks = async () => {
		dispatch({
			type: 'FETCH_INIT',
		});
		try {
			const response = await fetch(
				'http://openlibrary.org/search.json?q=' + bookState.searchedBook
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
				isbn: responseData.docs[0].isbn[0],
			};
			console.log(loadedBook);
			dispatch({ type: 'FETCH_SUCCESS', payload: loadedBook });
		} catch (error) {
			dispatch({
				type: 'FETCH_FAILURE',
				payload:
					'Error! I fell down the stairs while fetching your book!',
			});
		}
	};
	/** USEEFFECT FOR SCROLL INTO VIEW FUNCTION */
	useEffect(() => {
		scrollIntoView();
	});

	const scrollIntoView = () => {
		booksListRef.current.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
	};

	let bookBox = (
		<div ref={booksListRef} className="[ frame ] [ box ] [ wrap ]">
			<p>No books here at the moment.</p>
			<h4>You have to search.</h4>
		</div>
	);

	let bookCoverSrc =
		'http://covers.openlibrary.org/b/isbn/' +
		bookState.foundBook.isbn +
		'-M.jpg';

	if (!bookState.bookIsLoading && bookState.bookFetched) {
		bookBox = (
			<div ref={booksListRef} className="[ frame ] [ box ] [ wrap ]">
				<img src={bookCoverSrc} alt="" />
				<div className="stack">
					<h4>{bookState.foundBook.title}</h4>
					<p>
						by the author:{' '}
						<span className="text-bold">
							{bookState.foundBook.author}
						</span>
					</p>
				</div>
			</div>
		);
	} else if (bookState.fetchError !== null) {
		bookBox = (
			<div ref={booksListRef} className="[ frame ] [ box ] [ wrap ]">
				<p className="color-red">{bookState.fetchError}</p>
			</div>
		);
	}
	let inputInvalid = bookState.touched && !bookState.searchValid;
	return (
		<Region regionId={'new-books-region'}>
			<div className="stack">
				<form action="" className="wrap">
					<div className="input-wrapper">
						<input
							onChange={onSearchBookHandler}
							id="book-name"
							type="text"
							onBlur={onBlurHandler}
							className={inputInvalid ? 'invalid-input' : ''}
						/>
						<label htmlFor="book-name">
							{inputInvalid
								? 'Give me a book human!'
								: 'Book Name'}
						</label>
					</div>
					<button onClick={searchSubmitHandler} className="button">
						Search
					</button>
				</form>

				{/* <div ref={booksListRef} className="[ frame ] [ box ]"> */}
				{bookBox}
				{/* </div> */}
				{bookState.bookIsLoading && (
					<div className="loader-container">
						<p>Searching for your book</p>
						<span className="three-dots"></span>
					</div>
				)}
			</div>
		</Region>
	);
};

export default NewBooksList;
