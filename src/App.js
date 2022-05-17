// import { Fragment } from 'react';
import './assets/css/style.css'
import { Fragment } from 'react'
import Header from './components/Header'
import Wrapper from './UI/Wrapper'
import Hero from './components/Hero'
import { Route, Routes } from 'react-router-dom'
import NewBooksList from './components/NewBooksList'
import OldBooksList from './components/OldBooksList'
import WishBooksList from './components/WishBooksList'

function App() {
	return (
		<Fragment>
			<Header></Header>
			<Wrapper>
				<Hero></Hero>
				<Routes>
					<Route
						path="/new-books"
						element={<NewBooksList></NewBooksList>}
					></Route>
					<Route
						path="/old-books"
						element={<OldBooksList></OldBooksList>}
					></Route>
					<Route
						path="/wish-books"
						element={<WishBooksList></WishBooksList>}
					></Route>
				</Routes>
			</Wrapper>
		</Fragment>
	)
}

export default App
