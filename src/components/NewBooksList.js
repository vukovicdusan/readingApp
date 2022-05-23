import { useEffect, useRef, useReducer, useContext } from 'react';
import fetchBooksReducer from '../reducers/fetchBooksReducer';
import Region from '../UI/Region';
import Wrapper from '../UI/Wrapper';
import { v4 as uuidv4 } from 'uuid';
import { BooksContext } from '../context/BooksContext';

const reducerInit = {
	searchedBook: '',
	foundBook: [],
	bookIsLoading: false,
	fetchError: null,
	searchValid: false,
	touched: false,
	bookFetched: false,
};

const NewBooksList = (props) => {
	const booksListRef = useRef();
	const loadedBooksRef = useRef();
	const { listDispatch } = useContext(BooksContext);
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

	/* FETCH SEARCHED BOOKS */
	const fetchBooks = async () => {
		dispatch({
			type: 'FETCH_INIT',
		});
		try {
			const response = await fetch(
				'http://openlibrary.org/search.json?q=' + bookState.searchedBook
			);
			/* CHECKING FOR ERROR RESPONSE*/
			if (!response.ok) {
				throw new Error(
					'Error! I fell down the stairs while fetching your book!'
				);
			}
			const data = await response.json();

			let loadedBooks = [];
			for (let i = 0; i <= 5; i++) {
				let author =
					typeof data.docs[i].author_name === 'undefined'
						? 'No author'
						: data.docs[i].author_name[0];
				loadedBooks.push({
					author_name: author,
					title: data.docs[i].title,
					published: data.docs[i].first_publish_year,
				});
			}

			dispatch({ type: 'FETCH_SUCCESS', payload: loadedBooks });
		} catch (error) {
			dispatch({
				type: 'FETCH_FAILURE',
				payload:
					'Error! I fell down the stairs while fetching your book!' +
					error.message,
			});
		}
	};

	/** USEEFFECT FOR SCROLL INTO VIEW FUNCTION from BookLists component */
	useEffect(() => {
		props.scrollIntoView(booksListRef);
	}, []);

	/** SCROLL INTO VIEW ON FETCH  */
	useEffect(() => {
		bookState.bookFetched && props.scrollIntoView(loadedBooksRef);
	}, [bookState.bookFetched]);

	/** EMPTY BOOK STORAGE  */
	let bookBox = (
		<div className="[ box ]">
			<p>No books here at the moment milord.</p>
			<h4>Just say the name of a book!</h4>
		</div>
	);

	/** NOT EMPTY BOOK STORAGE  */
	if (!bookState.bookIsLoading && bookState.bookFetched) {
		bookBox = bookState.foundBook.map((book) => (
			<div key={uuidv4()} className="[ book-box ] [ box ] [ stack ]">
				<div className="stack">
					<h4>{book.title}</h4>
					<p>
						by the author:{' '}
						<span className="text-bold">{book.author_name}</span>
					</p>
					<p>
						Year of publishing:{' '}
						<span className="text-bold">{book.published}</span>
					</p>
				</div>

				<div className="stack">
					<button
						onClick={() =>
							listDispatch({
								type: 'ADD_BOOK',
								payload: book,
							})
						}
						className="button-secondary button-small"
					>
						Already read
					</button>
					<button
						onClick={() =>
							listDispatch({
								type: 'ADD_WISH',
								payload: book,
							})
						}
						className="button-secondary button-small"
					>
						Want to read
					</button>
				</div>
			</div>
		));
		/** FETCH ERROR MESSAGE  */
	} else if (bookState.fetchError !== null) {
		bookBox = (
			<div className="[ box ] [ wrap ]">
				<p className="color-red">{bookState.fetchError}</p>
			</div>
		);
	}

	let inputInvalid = bookState.touched && !bookState.searchValid;

	return (
		<Region
			regionId={'new-books-region'}
			regionBackground={'background-secondary'}
		>
			<Wrapper>
				<div className="stack">
					<form ref={booksListRef} action="" className="wrap">
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
						<button
							onClick={searchSubmitHandler}
							className="button-secondary"
						>
							Search
						</button>
					</form>

					<div ref={loadedBooksRef} className="cluster">
						{bookBox}
					</div>
					{bookState.bookIsLoading && (
						<div className="loader-container">
							<p>Searching for your book</p>
							<span className="three-dots"></span>
						</div>
					)}
				</div>
			</Wrapper>
		</Region>
	);
};

export default NewBooksList;
