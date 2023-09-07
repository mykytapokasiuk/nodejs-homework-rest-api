import Joi from "joi";

const contactAddSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
});

const contactUpdateSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
})
    .min(1)
    .max(3);

export default {
    contactAddSchema,
    contactUpdateSchema,
};
