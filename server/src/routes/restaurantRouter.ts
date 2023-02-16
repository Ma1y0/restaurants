import expres from "express"
import prisma from "../prisma"

const router = expres.Router()


// Get all restaurants
router.get("/", async (req, res) => {
    try {
        const restaurants = await prisma.restaurant.findMany({})

        res.status(200).json(restaurants)
    } catch (error) {
        res.status(500).json({ error })
    }
})

// Create a restaurant
router.post("/", async (req, res) => {
    const { name, ownerEmail } = req.body

    if (!name || !ownerEmail) {
        res.status(400).json({ error: "Name and Owner's email are required" })
    }

    try {
        const restaurant = await prisma.restaurant.create({
            data: {
                name: name,
                owner: {
                    connect: {
                        email: ownerEmail
                    }
                }
            }
        })
    
        res.status(201).json(restaurant)
    } catch (error) {
        res.status(500).json({ error })
    }

})

export {
    router as restaurantRouter
}