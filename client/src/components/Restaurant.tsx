import { Link } from "react-router-dom"
import defaultImg from "../../public/defaultImg.png"
import Img2 from "../../public/Img2.jpg"

type restaurant = {
	name: string
	rating: number
	id: string
}

const Restaurant = ({ name, rating, id }: restaurant) => {
	const stars = ["☆", "☆", "☆", "☆", "☆"]
	for (let i = 0; i < rating; i++) {
		stars[i] = "★"
	}

	return (
		<Link to={`/restaurant/${id}`}>
			<div className="border p-2 pr-4 flex rounded">
				<img className="w-[180px]" src={Img2} alt="Picture fo restaurant" />
				<div className="ml-3">
					<h3 className="text-5xl">{name}</h3>
					{stars.map((s) => (
						<span>{s}</span>
					))}
				</div>
			</div>
		</Link>
	)
}

export default Restaurant
