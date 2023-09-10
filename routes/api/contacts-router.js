import express from "express";
import contactsController from "../../controllers/contacts-controller.js";
import contactsValidation from "../../middleware/validation/contacts-validation.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAll);

// contactsRouter.get("/:id", contactsController.getById);

// contactsRouter.post("/", contactsValidation.addContactValidate, contactsController.add);

// contactsRouter.delete("/:id", contactsController.removeById);

// contactsRouter.put("/:id", contactsValidation.updateContactValidate, contactsController.updateById);

export default contactsRouter;
