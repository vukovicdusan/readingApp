import { Outlet, Routes, Route } from 'react-router-dom';
import NewBooksList from './NewBooksList';
import OldBooksList from './OldBooksList';
import WishBooksList from './WishBooksList';

const BookLists = () => {
	/** SCROLL INTO VIEW FUNCTION FOR ALL LIST COMPONENTS */
	const scrollIntoView = (ref) => {
		ref.current.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
	};
	return (
		<div className="[ book-lists ] [ stack ] [ full-bleed ]">
			<Routes>
				<Route
					path="new-books"
					element={
						<NewBooksList
							scrollIntoView={scrollIntoView}
						></NewBooksList>
					}
				></Route>
				<Route
					path="old-books"
					element={
						<OldBooksList
							scrollIntoView={scrollIntoView}
						></OldBooksList>
					}
				></Route>
				<Route
					path="wish-books"
					element={
						<WishBooksList
							scrollIntoView={scrollIntoView}
						></WishBooksList>
					}
				></Route>
			</Routes>
		</div>
	);
};

export default BookLists;
