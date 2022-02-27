import { errorHandler } from "../utils";
import { ObjectID } from "bson";
import { MongoDao } from "../config/db";

const getGroups = async (req, res) => {
    const contactsCollection = MongoDao.sharedDb.dbConnection.collection(
        "contacts"
    );
    
    const contacts = await contactsCollection.find({}).toArray();
    
    res.json([
        ...new Set(contacts.flatMap(([conntact]) => conntact.groups))
    ]);
};

const getGroupsForContact = async (req, res, next) => {
    const contactsCollection = MongoDao.sharedDb.dbConnection.collection(
        "contacts"
    );

    const contactId = req.params.contactId;
    
    contactId || next(errorHandler("Por favor ingresar un id de contacto", 422));

    const contact = await contactsCollection.findOne({
        _id: new ObjectID(contactId)
    });

    res.json(contact.groups);
};

export { getGroups, getGroupsForContact };