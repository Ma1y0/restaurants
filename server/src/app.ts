import express from "express"
import cors from "cors"
import * as dotenv from "dotenv"
import { debugLogger } from "./middleware/debug"
import { userRouter } from "./routes/userRouter"
import { restaurantRouter } from "./routes/restaurantRouter"

dotenv.config()
const app = express()

// Middleware
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json())
app.use(debugLogger)

// Router
app.use("/user", userRouter)
app.use("/restaurant", restaurantRouter)

app.listen(8080, () => console.log("App is listenig on http://localhost:8080"))