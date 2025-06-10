import {Router} from "express"

import { addToLikeList, findItemsById, getLikeList, removeAllFromLikeList, removeFromLikeList } from "../controllers/LikeLisTController.js"

const router = Router();

router.post("/add",addToLikeList)
router.post("/remove",removeFromLikeList)
router.post("/remove/all",removeAllFromLikeList)
router.get("/get/likelist",getLikeList)
router.post("/id",findItemsById)

export default router;