export function contentNegotiator({ res, config }) {
    res.format(config);
}

export function convertToCSV(arr) {
    return [Object.keys(arr[0])]
        .concat(arr)
        .map(it => Object.values(it).toString())
        .join("\n");
}

export function orderContactProps(contact) {
    return Object.keys(contact)
        .sort()
        .reduce(
            (acc, key) => ({
                ...acc,
                [key]: contact[key]
            }),
            {
                _id: contact._id,
                firstName: contact.firstName,
                lastName: contact.lastName
            }
        );
}

export function getKeys(obj) {
    return Object.keys(obj);
}

export function getValues(obj) {
    return Object.values(obj);
}

export function getPOJOArrayFrom(mongooseDocumentArray) {
    return mongooseDocumentArray.map(doc => doc.toObject());
}

export function getOrderedContactsPOJOArrayFrom(contactsDocumentArray) {
    return getPOJOArrayFrom(contactsDocumentArray).map(orderContactProps);
}

