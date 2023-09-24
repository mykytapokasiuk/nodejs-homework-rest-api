import Joi from "joi";

const contactAddSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": "missing field name",
    }),
    email: Joi.string().required().messages({
        "any.required": "missing field email",
    }),
    phone: Joi.string().required().messages({
        "any.required": "missing field phone",
    }),
    favorite: Joi.boolean(),
});

const contactUpdateSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
})
    .min(1)
    .max(3);

const contactUpdateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required().messages({
        "any.required": "missing field favorite",
    }),
});

export default {
    contactAddSchema,
    contactUpdateSchema,
    contactUpdateFavoriteSchema,
};
