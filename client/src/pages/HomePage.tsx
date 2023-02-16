import { useContext } from "react"
import { UserContext } from "../lib/UserContext"

const HomePgae = () => {
	const { auth } = useContext(UserContext)
	return (
		<main>
			<p>Welcome {auth?.name}</p>
		</main>
	)
}

export default HomePgae
