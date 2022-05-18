const fetchBooksReducer = (state, action) => {
	switch (action.type) {
		case 'SEARCH':
			if (action.payload.trim() !== '') {
				return {
					...state,
					searchedBook: action.payload,
					searchValid: true,
				};
			} else {
				return {
					...state,
					searchValid: false,
				};
			}

		case 'BLUR':
			return { ...state, touched: true };
		case 'SUBMIT':
			return { ...state, touched: true };
		case 'FETCH_INIT':
			return { ...state, bookIsLoading: true };
		case 'FETCH_SUCCESS':
			return {
				...state,
				bookIsLoading: false,
				foundBook: action.payload,
				bookFetched: true,
			};
		case 'FETCH_FAILURE':
			return {
				...state,
				fetchError: action.payload,
				bookFetched: false,
				bookIsLoading: false,
			};
		default:
			return state;
	}
};

export default fetchBooksReducer;
