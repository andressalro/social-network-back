import { Router } from "express";
import { getGroups, getGroupsForContact } from "../controllers";
import { AsyncWrapper } from "../utils";

const router = Router();

router.get("/", AsyncWrapper(getGroups));

router.get("/:contactId", AsyncWrapper(getGroupsForContact));

router.get("/:id", () => null);

export const groups = {
    baseUrl: "/groups",
    router
}