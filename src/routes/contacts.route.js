import { Router } from "express"
import { create, subscribeToList } from "../repository/contact.repository.js"
import { getContactInfo } from "../repository/quiz.repository.js"

const router = Router()

router.post('/create', async (req, res) => {
    try {
        const { name, email, id_quiz } = req.body
        const info = await getContactInfo(id_quiz)
        const result = await create(name, email, info.token)
        await subscribeToList(info.listId, result.contactId, info.token)
        res.json({ ...result })
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

export default router