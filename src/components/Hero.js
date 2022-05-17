import Wrapper from '../UI/Wrapper'
import Region from '../UI/Region'

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
					<li className="button"> What can I read?</li>

					<li className="button"> What have I read?</li>

					<li className="button"> What do I want to read?</li>
				</ul>
			</div>
		</Region>
	)
}

export default Hero
