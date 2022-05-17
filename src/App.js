// import { Fragment } from 'react';
import './assets/css/style.css'
import { Fragment } from 'react'
import Header from './components/Header'
import Wrapper from './UI/Wrapper'
import Hero from './components/Hero'

function App() {
	return (
		<Fragment>
			<Header></Header>
			<Wrapper>
				<Hero></Hero>
			</Wrapper>
		</Fragment>
	)
}

export default App
