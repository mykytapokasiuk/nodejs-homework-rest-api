import contactsSchemas from "../../schemas/contacts-schemas.js";
import { validateBody } from "../../decorators/index.js";

const addContactValidate = validateBody(contactsSchemas.contactAddSchema);
const updateContactValidate = validateBody(contactsSchemas.contactUpdateSchema);

export default {
    addContactValidate,
    updateContactValidate,
};
