import React, { useEffect, createContext, useReducer } from 'react';
import booksListReducer from '../reducers/booksListReducer';

export const BooksContext = createContext();

const BooksContextProvider = (props) => {
	/** KEEP DATA INSIDE THE STORAGE AFTER REFRESH PAGE */
	const [books, listDispatch] = useReducer(booksListReducer, [], () => {
		const localData = localStorage.getItem('books');
		return localData ? JSON.parse(localData) : [];
	});

	/** SETTING THE BOOK STORAGE TO LOCAL STORAGE  */
	useEffect(() => {
		localStorage.setItem('books', JSON.stringify(books));
	}, [books]);

	return (
		<BooksContext.Provider value={{ books, listDispatch }}>
			{props.children}
		</BooksContext.Provider>
	);
};

export default BooksContextProvider;
