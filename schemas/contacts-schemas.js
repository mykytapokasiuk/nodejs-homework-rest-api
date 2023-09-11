import Joi from "joi";

const contactAddSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
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
    favorite: Joi.boolean().required(),
});

export default {
    contactAddSchema,
    contactUpdateSchema,
    contactUpdateFavoriteSchema,
};
