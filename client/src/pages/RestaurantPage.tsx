import { useParams } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import { useQuery, useQueryClient } from "react-query"
import Img2 from "../../public/Img2.jpg"
import axios from "../lib/axios"
import { UserContext } from "../lib/UserContext"

const RestaurantPage = () => {
	const { id } = useParams()
	const { user } = useContext(UserContext)
	const queryClient = useQueryClient()

	const [restaurant, setRestaurant] = useState()
	const [stars, setStars] = useState([])

	useEffect(() => {
		if (restaurant) {
			const star = ["☆", "☆", "☆", "☆", "☆"]
			for (let i = 0; i < restaurant.rating; i++) {
				star[i] = "★"
			}
			setStars(star)
		}
	}, [restaurant])

	const getRestaurant = async () => {
		const response = await axios(`/restaurant/${id}`)

		setRestaurant(response.data)
		return response
	}

	const { isLoading, isError, data, error } = useQuery("restaurant", getRestaurant)

	if (isLoading) {
		return (
			<main>
				<p>Loading ...</p>
			</main>
		)
	}

	if (isError) {
		return (
			<main>
				<p>{error.message}</p>
			</main>
		)
	}

	return (
		<main className="m-12 flex">
			<img src={Img2} className="d w-[500px] mr-3" />
			<div>
				<h2 className="text-6xl">{restaurant?.name}</h2>
				<p>
					{stars.map((s) => (
						<span className="">{s}</span>
					))}
				</p>
				<p>{restaurant?.bio}</p>
			</div>
		</main>
	)
}

export default RestaurantPage
