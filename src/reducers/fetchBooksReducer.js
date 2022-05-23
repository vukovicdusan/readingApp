const fetchBooksReducer = (state, action) => {
	switch (action.type) {
		/** MANAGING THE BOOK SEARCH INPUT */
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
		/** MANAGING THE EMPTY INPUT ON LOOSING FOCUS */
		case 'BLUR':
			return { ...state, touched: true };
		/** MANAGING THE TOUCHED STATE FOR THE INPUT */
		case 'SUBMIT':
			return { ...state, touched: true };
		/** MANAGING THE LOADING STATE */
		case 'FETCH_INIT':
			return { ...state, bookIsLoading: true };
		/** MANAGING THE BOOK DATA */
		case 'FETCH_SUCCESS':
			return {
				...state,
				bookIsLoading: false,
				foundBook: action.payload,
				bookFetched: true,
			};
		/** MANAGING THE FETCH ERROR */
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
