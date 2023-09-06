import Joi from "joi";

const contactAddSchema = Joi.object({
    name: Joi.string(), //! Changes here
    email: Joi.string(),
    phone: Joi.string(),
});

export default {
    contactAddSchema,
};
