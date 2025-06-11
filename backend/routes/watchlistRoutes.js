import { Router } from "express";
import {addToWatchlist,removeFromWatchlist,removeAllFromWatchlist,getWatchlist,findItemsByIdWatchlist} from "../controllers/watchlistController.js"


const router = Router();


router.post("/add",addToWatchlist)
router.post("/remove",removeFromWatchlist)
router.post("/remove/all",removeAllFromWatchlist)
router.get("/get",getWatchlist)
router.post("/id",findItemsByIdWatchlist)

export default router;

