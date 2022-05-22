import './assets/css/style.css';
import { Fragment } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Wrapper from './UI/Wrapper';
import Hero from './components/Hero';
import { Route, Routes, Navigate } from 'react-router-dom';
// import NewBooksList from './components/NewBooksList';
// import OldBooksList from './components/OldBooksList';
// import WishBooksList from './components/WishBooksList';
import BooksContextProvider from './context/BooksContext';
import ListContextProvider from './context/ListContext';
import BookLists from './components/BookLists';

function App() {
	return (
		<Fragment>
			<Header></Header>
			<Wrapper>
				<BooksContextProvider>
					<ListContextProvider>
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
					</ListContextProvider>
				</BooksContextProvider>
			</Wrapper>
			<Footer></Footer>
		</Fragment>
	);
}

export default App;
