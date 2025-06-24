import {Router} from "express"

import { addToLikeList, findItemsById, getLikeList, removeAllFromLikeList, removeFromLikeList } from "../controllers/likelistController.js"

const router = Router();

router.post("/add",addToLikeList)
router.post("/remove",removeFromLikeList)
router.post("/remove/all",removeAllFromLikeList)
router.get("/get",getLikeList)
router.post("/id",findItemsById)

export default router;