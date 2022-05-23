import './assets/css/style.css';
import { Fragment } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Wrapper from './UI/Wrapper';
import Hero from './components/Hero';
import { Route, Routes, Navigate } from 'react-router-dom';
import BooksContextProvider from './context/BooksContext';
import BookLists from './components/BookLists';

function App() {
	return (
		<Fragment>
			<Header></Header>
			<Wrapper>
				<BooksContextProvider>
					<Hero></Hero>
					<Routes>
						<Route
							path="/"
							element={<Navigate replace to="/book-lists" />}
						></Route>
						<Route
							path="/book-lists/*"
							element={<BookLists></BookLists>}
						></Route>
					</Routes>
				</BooksContextProvider>
			</Wrapper>
			<Footer></Footer>
		</Fragment>
	);
}

export default App;
