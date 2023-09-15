import usersSchemas from "../../schemas/users-schemas.js";
import { validateBody } from "../../decorators/index.js";

const userSignupValidate = validateBody(usersSchemas.userSignupSchema);
const userSigninValidate = validateBody(usersSchemas.userSigninSchema);

export default {
    userSignupValidate,
    userSigninValidate,
};
