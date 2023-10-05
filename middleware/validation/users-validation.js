import usersSchemas from "../../schemas/users-schemas.js";
import { validateBody } from "../../decorators/index.js";

const userSignupValidate = validateBody(usersSchemas.userSignupSchema);
const userSigninValidate = validateBody(usersSchemas.userSigninSchema);
const userRefreshTokenValidate = validateBody(usersSchemas.userRefreshTokenSchema);
const userEmailValidate = validateBody(usersSchemas.userEmailSchema);

export default {
    userSignupValidate,
    userSigninValidate,
    userRefreshTokenValidate,
    userEmailValidate,
};
