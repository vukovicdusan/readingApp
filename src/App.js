import './assets/css/style.css';
import { Fragment } from 'react';
import Header from './components/Header';
import Wrapper from './UI/Wrapper';
import Hero from './components/Hero';
import { Route, Routes, Navigate } from 'react-router-dom';
import NewBooksList from './components/NewBooksList';
import OldBooksList from './components/OldBooksList';
import WishBooksList from './components/WishBooksList';
import BooksContextProvider from './context/BooksContext';

// let booksStorage = [
// 	{
// 		id: '234',
// 		title: 'the lord of the rings',
// 		author: 'JJR Tolkien',
// 		publish: '1951',
// 		readIt: true,
// 		onWishList: false,
// 	},
// 	{
// 		id: '567',
// 		title: 'Panambra',
// 		author: 'Mr Sloan',
// 		publish: '1929',
// 		readIt: false,
// 		onWishList: true,
// 	},
// ];

function App() {
	return (
		<Fragment>
			<Header></Header>
			<Wrapper>
				<BooksContextProvider>
					<Routes>
						<Route
							path="/"
							element={<Navigate replace to="/hero" />}
						></Route>
						<Route path="/hero/*" element={<Hero></Hero>}>
							<Route
								path="new-books"
								element={<NewBooksList></NewBooksList>}
							></Route>
							<Route
								path="old-books"
								element={<OldBooksList></OldBooksList>}
							></Route>
							<Route
								path="wish-books"
								element={<WishBooksList></WishBooksList>}
							></Route>
						</Route>
					</Routes>
				</BooksContextProvider>
			</Wrapper>
		</Fragment>
	);
}

export default App;
