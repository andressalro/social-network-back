import { errorHandler, fakeContacts } from "../utils";
import { ObjectID } from "bson";
import { MongoDao } from "../config/db";
import { Contact } from "../models";
/*
const getContacts = async (req, res) => {
    res.json([...fakeContacts]);
}
*/

export const getContacts = async (req, res) => {
    const contacts = await Contact.find();
    res.format({
        text: function() {
            const contactsAstext = contacts
                .map(contact => Object.entries(contact).map(t => t.join(":")))
                .join("\n\n =====================>>       ");
            res.send(contactsAstext);
        },

        html: function() {
            const html = [
                `<table style="border: 1px solid black;" >`,
                `<th style="border: 1px solid black; background:red;"> Contact ID </th>
                <th style="border: 1px solid black; background:black; color: whit; "> Contact Data </th>
                `,
                
            ];
            contacts.forEach(({ _id, ...contact}) => {
                html.push(` 
                    <tr style="border: 1px solid black;">
                    <td style="border: 1px solid black; background:yellow;">${ _id}</td>
                    <td style="border: 1px solid black;"> ${Object.entries(contact)
                        .map(([key, value]) => {
                            return `<p><b>${key}</b>: ${JSON.stringify(value).replace(
                                /"/g,
                                ""
                            )} </p>`
                        })
                        .join("\n")}</td>
                    </tr>
                ` );
            });

            res.send(html.join("\n"));
        },

        json: function() {
            res.json(contacts);
        }
    });
};

export const getContact = async (req, res, next) => {
    const contactsCollection = MongoDao.sharedDb.dbConnection.collection(
        "contacts"
    );

    const contactId = req.params.id;
    contactId || next(errorHandler("Por favor ingresar un id de contacto", 422));
    
    const contact = await Contact.findOne({
        _id: new ObjectID(contactId)
    })
    res.json(contact)
}

export const postContact = async (req, res, next) => {
    const contact = req.body;

    (contact && contact.primaryContactNumber) ||
        next(errorHandler("Por favor ingresar un contacto valido", 422));
    
    const newContact = new Contact({ ...contact });
    await newContact.save();
};

export const postContactMany = async (req, res, next) => {
    await Contact.insertMany([...fakeContacts.values()]);

    res.json({message: "Generando varios contactos"});
}

export const putContact = async (req, res, next) => {
    const contactId = req.params.id;
    const contact = req.body;

    contactId || next(errorHandler("por favor ingrese un id de contacto", 422));
    (contact && contact.primaryContactNumber) ||
        next(errorHandler("Por favor ingrese un contacto valido", 422))
    
    const result = await Contact.updateOne(
        { _id: new ObjectID(contactId) },
        { $set: contact }
    );
    result.insertedCount === 1
        ? res.json({message: "Contacto creado"})
        : next(errorHandler("No se inserto ningun dato"));
};

export const deleteContact = async (req, res, next) => {

    const contactId = req.params.id;

    contactId || next(errorHandler("Por favor ingrese un id de contacto", 422));

    const result = await Contact.deleteOne({
        _id: new ObjectID(contactId)
    });

    result.deletedCount === 1
        ? res.json({ message: "Contacto eliminado"})
        : next(errorHandler("No sea eliminado ningun dato"));
};

export const deleteAllContact = async (req, res, next) => {
    await Contact.deleteMany({});

    res.json({message: "Todos los contactos eliminados"});
}