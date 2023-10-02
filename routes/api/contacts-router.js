import express from "express";
import contactsController from "../../controllers/contacts-controller.js";
import contactsValidation from "../../middleware/validation/contacts-validation.js";
import isValidId from "../../middleware/isValidId.js";
import authenticate from "../../middleware/authenticate.js";
import upload from "../../middleware/upload.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:id", isValidId, contactsController.getById);

contactsRouter.post(
    "/",
    upload.single("avatar"),
    contactsValidation.addContactValidate,
    contactsController.add
);

contactsRouter.put(
    "/:id",
    isValidId,
    contactsValidation.updateContactValidate,
    contactsController.updateById
);

contactsRouter.patch(
    "/:id/favorite",
    isValidId,
    contactsValidation.updateContactFavoriteValidate,
    contactsController.updateStatusContact
);

contactsRouter.delete("/:id", isValidId, contactsController.removeById);

export default contactsRouter;
