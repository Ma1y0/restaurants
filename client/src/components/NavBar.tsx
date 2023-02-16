import { Link } from "react-router-dom"
import { useContext, useState } from "react"
import { UserContext } from "../lib/UserContext"

const NavBar = () => {
	const { user, setUser } = useContext(UserContext)

	return (
		<div className="w-full p-6">
			<div className="flex justify-between items-center">
				<h1>
					<Link to="/">Restaurants</Link>
				</h1>
				{user ? (
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mr-3"
						onClick={() => {
							setUser({})
						}}
					>
						Log Out
					</button>
				) : (
					<div className="justify-end">
						<Link to="/login">
							<button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mr-3">
								Log In
							</button>
						</Link>
						<Link to="/register">
							<button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
								Register
							</button>
						</Link>
					</div>
				)}
			</div>
		</div>
	)
}

export default NavBar
