import { HttpError } from "../utils/index.js";

const validateBody = (schema) => {
    const func = async (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) return next(HttpError(404, error.message));

        next();
    };
    return func;
};

export default validateBody;
