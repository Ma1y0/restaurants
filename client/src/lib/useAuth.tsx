import { useContext, useDebugValue } from "react"
import AuthContext from "./AuthProvider"

const useAuth = () => {
	const { auth } = useContext(AuthContext)
	useDebugValue(3)
}
