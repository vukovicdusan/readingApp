import React, { useEffect, createContext, useReducer, useState } from 'react';
import booksListReducer from '../reducers/booksListReducer';

export const BooksContext = createContext();

const BooksContextProvider = (props) => {
	const [books, listDispatch] = useReducer(booksListReducer, [], () => {
		const localData = localStorage.getItem('books');
		return localData ? JSON.parse(localData) : [];
	});
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
