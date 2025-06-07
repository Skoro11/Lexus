import {Router} from "express"

import { addToLikeList } from "../controllers/LikeLisTController.js"

const router = Router();

router.get("/add",addToLikeList)



export default router;