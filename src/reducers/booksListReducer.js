import { v4 as uuidv4 } from 'uuid';

const booksListReducer = (state, action) => {
	switch (action.type) {
		/** ADDING BOOK TO THE READ BOOKS LIST */
		case 'ADD_BOOK':
			const isDuplicateBook = state.some(
				(book) => book.title === action.payload.title
			);
			return !isDuplicateBook
				? [
						...state,
						{
							id: uuidv4(),
							title: action.payload.title,
							author: action.payload.author_name,
							published: action.payload.published,
							readIt: true,
							onWishList: false,
						},
				  ]
				: state;

		/** REMOVING THE BOOK COMPLETELY */
		case 'REMOVE_BOOK':
			return state.filter((book) => book.id !== action.payload);
		case 'ADD_WISH':
			const isDuplicateWish = state.some(
				(book) => book.title === action.payload.title
			);

			return !isDuplicateWish
				? [
						...state,
						{
							id: uuidv4(),
							title: action.payload.title,
							author: action.payload.author_name,
							published: action.payload.published,
							readIt: false,
							onWishList: true,
						},
				  ]
				: state;

		/** REMOVING THE BOOK COMPLETELY */
		case 'REMOVE_WISH':
			return state.filter((book) => book.id !== action.payload);

		/** MOVING THE BOOK FROM WISH LIST TO READ LIST */
		case 'WISH_COME_TRUE':
			return (
				state.filter((book) => book.id === action.payload),
				state.map((book) =>
					book.id === action.payload
						? { ...book, onWishList: false, readIt: true }
						: book
				)
			);

		/** ADDING THE MESSAGE TO THE BOOK  */
		case 'ADD_MEMO':
			return (
				state.filter((book) => book.id !== action.payload.id),
				state.map((book) =>
					book.id === action.payload.id
						? { ...book, memo: action.payload.message }
						: book
				)
			);
		/** ADDING THE READING NOW CHECK TO THE BOOK  */
		case 'READING_NOW':
			return (
				state.filter((book) => book.id !== action.payload),
				state.map((book) =>
					book.id === action.payload
						? { ...book, readingNow: true }
						: book
				)
			);
		default:
			return state;
	}
};

export default booksListReducer;
