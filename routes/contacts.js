import { Router } from "express";

import {
    getContacts,
    getContact,
    postContact,
    putContact,
    deleteContact
} from "../controllers";

import { AsyncWrapper } from "../utils/asyncWrapper";

const router = Router();

router.get("/", AsyncWrapper(getContacts));

router.get("/:id", AsyncWrapper(getContact));

router.post("/", AsyncWrapper(postContact));

router.put("/:id", AsyncWrapper(putContact));

router.delete("/:id", AsyncWrapper(deleteContact));

export const contacts = {
    baseUrl: "/contacts",
    router
}