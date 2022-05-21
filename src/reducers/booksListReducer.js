import { v4 as uuidv4 } from 'uuid';

const booksListReducer = (state, action) => {
	switch (action.type) {
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
							readIt: action.payload.readIt,
							onWishList: true,
						},
				  ]
				: state;
		case 'REMOVE_WISH':
			return state.filter((book) => book.id !== action.payload);

		default:
			return state;
	}
};

export default booksListReducer;
