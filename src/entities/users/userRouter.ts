import express from "express";
import { UserController } from "./userController";

const router = express.Router();
const userController = new UserController()


router.post("/registerUser", async (req, res, next) => {
    try {
        res.json(await userController.registerUser(req.body));
    } catch (e) {
        next(e);
    }
});

export default router;
