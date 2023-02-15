import { BrowserRouter, Route, Routes } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import NavBar from "./components/NavBar"
import E404 from "./pages/404"
import HomePage from "./pages/HomePage"
import LogIn from "./pages/LogIn"
import Register from "./pages/Register"
import AuthProvider from "./lib/authProvider"

const queryClient = new QueryClient()

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<AuthProvider>
					<header>
						<NavBar />
					</header>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/login" element={<LogIn />} />
						<Route path="/register" element={<Register />} />
						<Route path="*" element={<E404 />} />
					</Routes>
				</AuthProvider>
			</BrowserRouter>
		</QueryClientProvider>
	)
}

export default App
