import { useEffect, useRef, useReducer } from 'react';
import fetchBooksReducer from '../reducers/fetchBooksReducer';
import Region from '../UI/Region';
import Wrapper from '../UI/Wrapper';

const reducerInit = {
	searchedBook: '',
	foundBook: [],
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
					publishYear: data.docs[i].first_publish_year,
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

	/** USEEFFECT FOR SCROLL INTO VIEW FUNCTION */
	useEffect(() => {
		bookState.bookFetched && scrollIntoView();
	}, [bookState.bookFetched]);

	const scrollIntoView = () => {
		booksListRef.current.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
	};

	let bookBox = (
		<div className="[ box ]">
			<p>No books here at the moment milord.</p>
			<h4>Just say the name of a book!</h4>
		</div>
	);

	if (!bookState.bookIsLoading && bookState.bookFetched) {
		bookBox = bookState.foundBook.map((book, index) => (
			<div
				key={Math.random() + index}
				className="[ book-box ] [ box ] [ stack ]"
			>
				{/* <img src={bookCoverSrc} alt="" /> */}

				<div className="stack">
					<h4>{book.title}</h4>
					<p>
						by the author:{' '}
						<span className="text-bold">{book.author_name}</span>
					</p>
					<p>
						Year of publishing:{' '}
						<span className="text-bold">{book.publishYear}</span>
					</p>
				</div>

				<div className="stack">
					<button className="button-secondary button-small">
						Already read
					</button>
					<button className="button-secondary button-small">
						Want to read
					</button>
				</div>
			</div>
		));
	} else if (bookState.fetchError !== null) {
		bookBox = (
			<div className="[ box ] [ wrap ]">
				<p className="color-red">{bookState.fetchError}</p>
			</div>
		);
	}
	let inputInvalid = bookState.touched && !bookState.searchValid;
	return (
		<div className="full-bleed">
			<Region regionId={'new-books-region'}>
				<Wrapper>
					<div className="stack">
						<form action="" className="wrap">
							<div className="input-wrapper">
								<input
									onChange={onSearchBookHandler}
									id="book-name"
									type="text"
									onBlur={onBlurHandler}
									className={
										inputInvalid ? 'invalid-input' : ''
									}
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

						<div ref={booksListRef} className="cluster">
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
		</div>
	);
};

export default NewBooksList;
