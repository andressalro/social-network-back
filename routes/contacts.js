import { Router } from "express";

import {
    getContacts,
    getContact,
    postContact,
    putContact,
    deleteContact,
    postContactMany,
    deleteAllContact
} from "../controllers";

import { AsyncWrapper } from "../utils/asyncWrapper";

const router = Router();

router.get("/", AsyncWrapper(getContacts));

router.get("/:id", AsyncWrapper(getContact));

router.post("/", AsyncWrapper(postContact));

router.post("/many", AsyncWrapper(postContactMany));

router.put("/:id", AsyncWrapper(putContact));

router.delete("/:id", AsyncWrapper(deleteContact));

router.delete("/", AsyncWrapper(deleteAllContact));

export const contacts = {
    baseUrl: "/contacts",
    router
}