import Wrapper from '../UI/Wrapper';
import Region from '../UI/Region';
import { NavLink, Outlet } from 'react-router-dom';
import arrow from '../assets/css/img/arrow.png';

const Hero = () => {
	return (
		<Region regionId={'hero'}>
			<div className="stack">
				<h1>
					Hello my <span className="text-underline">smart</span>{' '}
					human!
				</h1>
				<h4 className="color-red">
					What smart stuff would you like to do today?
				</h4>
				<img src={arrow} alt="arrow" className="margin-top-2" />
				<ul className="[ wrap ] [ margin-top-3 ]">
					<NavLink
						to="new-books"
						// activeClassName="active-list"
						className="button"
					>
						What can I read?
					</NavLink>

					<NavLink to="old-books" className="button">
						What have I read?
					</NavLink>

					<NavLink to="wish-books" className="button">
						What do I want to read?
					</NavLink>
				</ul>
			</div>
			<Outlet></Outlet>
		</Region>
	);
};

export default Hero;
