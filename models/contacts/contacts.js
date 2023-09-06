import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("models", "contacts", "contacts.json");
const updateContacts = (contacts) => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
};

const getContactById = async (contactId) => {
    const contacts = await listContacts();
    const result = contacts.find((item) => item.id === contactId);
    return result || null;
};

const removeContactById = async (contactId) => {
    const contacts = await listContacts();
    const itemIndex = contacts.findIndex((item) => item.id === contactId);
    if (itemIndex === -1) return null;
    const [result] = contacts.splice(itemIndex, 1);
    await updateContacts(contacts);
    return result;
};

const addContact = async ({ name, email, phone }) => {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
    };
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
};

const updateContactById = async (id, data) => {
    const contacts = await listContacts();
    const itemIndex = contacts.findIndex((item) => item.id === id);
    if (itemIndex === -1) return null;

    const contactsItem = contacts[itemIndex];
    contacts[itemIndex] = { ...contactsItem, ...data };

    await updateContacts(contacts);
    return contacts[itemIndex];
};

export default {
    listContacts,
    getContactById,
    removeContactById,
    addContact,
    updateContactById,
};
