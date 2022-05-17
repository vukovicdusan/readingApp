import Wrapper from '../UI/Wrapper'
import Region from '../UI/Region'
import { NavLink } from 'react-router-dom'

const Hero = () => {
	return (
		<Region regionId={'hero'}>
			<div className="stack">
				<h1>
					Hello my <span className="text-underline">smart</span>{' '}
					human!
				</h1>
				<h4 className="color-red">
					What smart stuff do you want to do?
				</h4>
				<ul className="[ wrap ] [ margin-top-3 ]">
					<NavLink
						to={'/new-books'}
						// activeClassName="active-list"
						className="button"
					>
						{' '}
						What can I read?
					</NavLink>

					<NavLink to={'/old-books'} className="button">
						{' '}
						What have I read?
					</NavLink>

					<NavLink to={'/wish-books'} className="button">
						{' '}
						What do I want to read?
					</NavLink>
				</ul>
			</div>
		</Region>
	)
}

export default Hero
