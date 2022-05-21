import './assets/css/style.css';
import { Fragment } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Wrapper from './UI/Wrapper';
import Hero from './components/Hero';
import { Route, Routes, Navigate } from 'react-router-dom';
import NewBooksList from './components/NewBooksList';
import OldBooksList from './components/OldBooksList';
import WishBooksList from './components/WishBooksList';
import BooksContextProvider from './context/BooksContext';

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
			<Footer></Footer>
		</Fragment>
	);
}

export default App;
