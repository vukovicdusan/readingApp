import Wrapper from '../UI/Wrapper';
import Region from '../UI/Region';
import { NavLink } from 'react-router-dom';
import arrow from '../assets/css/img/arrow.png';
import { useContext, useState } from 'react';
import { ListContext } from '../context/ListContext';

const Hero = () => {
	const { whatListHandler } = useContext(ListContext);
	// const [whatList, setWhatList] = useState('');
	// const whatListHandler = (list) => {
	// 	setWhatList(list);
	// };
	// console.log(whatList);
	return (
		<Region regionId={'hero'}>
			<div className="stack">
				<h1>
					You{' '}
					<span className="text-underline color-red">don't like</span>{' '}
					reading books but here we are dear
					<span className="text-underline color-red"> reader!</span>
				</h1>
				<h4>
					Let's find a book that your beautiful brain will never read
					to the end!
				</h4>
				<img src={arrow} alt="arrow" className="margin-top-2" />
				<ul className="[ wrap ] [ margin-top-3 ]">
					<NavLink
						onClick={() => whatListHandler('new')}
						to="/book-lists/new-books"
						// activeClassName="active-list"
						className="button"
					>
						What can I read?
					</NavLink>

					<NavLink
						onClick={() => whatListHandler('old')}
						to="/book-lists/old-books"
						className="button"
					>
						What have I read?
					</NavLink>

					<NavLink
						onClick={() => whatListHandler('wish')}
						to={'/book-lists/wish-books'}
						className="button"
					>
						What do I want to read?
					</NavLink>
				</ul>
			</div>
			{/* <Outlet></Outlet> */}
		</Region>
	);
};

export default Hero;
