import {
	ChangeEvent,
	ChangeEventHandler,
	FormEvent,
	FormEventHandler,
	useContext,
	useState,
} from "react"
import { UserContext } from "../lib/UserContext"
import { useQuery, useQueryClient } from "react-query"
import Restaurant from "../components/Restaurant"
import axios from "../lib/axios"

const HomePgae = () => {
	const queryClient = useQueryClient()

	const [search, setSearch] = useState("")
	const [restaurants, setRestaurants] = useState()

	const onChange: ChangeEventHandler<HTMLInputElement> = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value)
	}

	const getRestaurants = async () => {
		const response = await axios.get("/restaurant", {
			headers: { "Content-Type": "application/json" },
			withCredentials: true,
		})

		return response
	}

	const { isLoading, isError, data, error } = useQuery("restaurants", getRestaurants)

	const onSubmit: FormEventHandler<HTMLFormElement> = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		// const query = useQuery("restaurants", getRestaurants)
		// console.log(query)
	}

	return (
		<main>
			<form className="flex justify-center" onSubmit={onSubmit}>
				<input
					value={search}
					onChange={onChange}
					type="text"
					className="sm:w-full md:w-[80%] lg:w-[25%] w-[40%] rounded p-2"
					placeholder="Search"
				/>
				<button>
					<span className="f text-2xl">🔎</span>
				</button>
			</form>
			<div className="flex justify-center flex-wrap items-center mt-6 gap-3">
				{isLoading ? <p>Loading ...</p> : null}
				{isError ? <p>Error: {error.message}</p> : null}
				{data?.data.length >= 1
					? data?.data.map((r) => <Restaurant name={r.name} rating={r.rating} id={r.id} />)
					: null}
			</div>
		</main>
	)
}

export default HomePgae
