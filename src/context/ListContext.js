import React, { createContext, useState } from 'react';

export const ListContext = createContext();

const ListContextProvider = (props) => {
	const [whatList, setWhatList] = useState('');
	const whatListHandler = (list) => {
		setWhatList(list);
	};
	return (
		<ListContext.Provider value={{ whatList, whatListHandler }}>
			{props.children}
		</ListContext.Provider>
	);
};

export default ListContextProvider;
