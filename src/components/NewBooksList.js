import { useEffect, useState, useRef } from 'react';
import Region from '../UI/Region';

const NewBooksList = () => {
	const booksListRef = useRef();
	const [searchedBook, setSearchedBook] = useState('');
	const [foundBook, setFoundBook] = useState([]);

	const onSearchbookHandler = (e) => {
		e.preventDefault();
		setSearchedBook(e.target.value);
	};
	useEffect(() => {
		bookBox !== '' && scrollIntoView();
	});

	const fetchBooks = async () => {
		const response = await fetch(
			'http://openlibrary.org/search.json?q=' + searchedBook
		);
		const responseData = await response.json();

		const loadedBook = {
			title: responseData.docs[0].title,
			author: responseData.docs[0].author_name[0],
		};
		// console.log(loadedBook);
		setFoundBook(loadedBook);
	};

	const searchSubmitHandler = (e) => {
		e.preventDefault();
		fetchBooks();

		console.log(foundBook);
	};
	// }, [])

	const scrollIntoView = () => {
		booksListRef.current.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
	};

	let bookBox = '';
	if (typeof foundBook.title === 'undefined') {
		bookBox = '';
	} else {
		bookBox = (
			<div ref={booksListRef} className="box">
				<h4>{foundBook.title}</h4>
				<p>by: {foundBook.author}</p>
			</div>
		);
	}
	return (
		<Region regionId={'new-books-region'}>
			<div className="stack">
				<form action="" className="wrap">
					<div className="input-wrapper">
						<input
							onChange={onSearchbookHandler}
							id="book-name"
							type="text"
						/>
						<label htmlFor="book-name">Book Name</label>
					</div>
					<button onClick={searchSubmitHandler} className="button">
						Search
					</button>
				</form>

				{bookBox}
			</div>
		</Region>
	);
};

export default NewBooksList;
