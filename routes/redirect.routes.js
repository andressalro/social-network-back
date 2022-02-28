import { Router } from "express";

const router = Router();

router.all("/user*", (req, res) => {
    res.redirect(308, `/api/v1${req.url}`);
});

router.all("/posts*", (req, res) => {
    res.redirect(308, `/api/v1${req.url}`);
});

export const redirectRouter = {
    baseUrl: "/",
    router
}