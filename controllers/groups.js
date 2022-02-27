import { errorHandler } from "../utils";
import { ObjectID } from "bson";
import { MongoDao } from "../config/db";
import { Contact } from "../models";

export const getGroups = async (req, res) => {
    const contacts = await Contact.find();
    
    res.json([
        ...new Set(contacts.flatMap(([conntact]) => conntact.groups))
    ]);
};

export const getGroupsForContact = async (req, res, next) => {
    const contactId = req.params.contactId;
    
    contactId || next(errorHandler("Por favor ingresar un id de contacto", 422));

    const contact = await Contact.findOne({
        _id: new ObjectID(contactId)
    });

    res.json(contact.groups);
};