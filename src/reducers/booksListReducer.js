import { v4 as uuidv4 } from 'uuid';

const booksListReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_BOOK':
			return [
				...state,
				{
					id: uuidv4(),
					title: action.payload.title,
					author: action.payload.author_name,
					published: action.payload.published,
					readIt: true,
					onWishList: false,
				},
			];
		case 'REMOVE_BOOK':
			return state.filter(
				(book) => book.id !== action.payload && book.onWishList
			);
		case 'ADD_WISH':
			return [
				...state,
				{
					id: uuidv4(),
					title: action.payload.title,
					author: action.payload.author_name,
					published: action.payload.published,
					readIt: action.payload.readIt,
					onWishList: true,
				},
			];
		case 'REMOVE_WISH':
			return state.filter(
				(book) => book.id !== action.payload && book.readIt
			);

		default:
			return state;
	}
};

export default booksListReducer;
