import { BrowserRouter, Route, Routes } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import NavBar from "./components/NavBar"
import E404 from "./pages/404"
import HomePage from "./pages/HomePage"
import LogIn from "./pages/LogIn"
import Register from "./pages/Register"
import { ToastContainer } from "react-toastify"
import { UserContext } from "./lib/UserContext"
import { useMemo, useState } from "react"
import { ReactQueryDevtools } from "react-query/devtools"
import RestaurantPage from "./pages/RestaurantPage"

const queryClient = new QueryClient()

function App() {
	const [user, setUser] = useState(null)

	const value = useMemo(() => ({ user, setUser }), [user, setUser])

	return (
		<QueryClientProvider client={queryClient}>
			<UserContext.Provider value={value}>
				<BrowserRouter>
					<header>
						<NavBar />
					</header>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/login" element={<LogIn />} />
						<Route path="/register" element={<Register />} />
						<Route path="/restaurant/:id" element={<RestaurantPage />} />
						<Route path="*" element={<E404 />} />
					</Routes>
					<ToastContainer position="bottom-right" theme="dark" hideProgressBar={true} />
				</BrowserRouter>
			</UserContext.Provider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}

export default App
