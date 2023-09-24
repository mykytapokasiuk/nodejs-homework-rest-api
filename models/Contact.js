import { Schema, model } from "mongoose";
import { handleSaveError, runValidateAtUpdate } from "./hooks.js";

const contactSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Set name for contact"],
        },
        email: {
            type: String,
            required: [true, "User email required"],
        },
        phone: {
            type: String,
            validate: {
                validator: function (v) {
                    return /\(\d{3}\) \d{3}-\d{4}/.test(v);
                },
                message: (props) =>
                    `${props.value} is not a valid phone number! Please save it in this format (111) 111-1111`,
            },
            required: [true, "User phone number required"],
        },
        favorite: {
            type: Boolean,
            default: false,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
    },
    { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleSaveError);
contactSchema.pre("findOneAndUpdate", runValidateAtUpdate);
contactSchema.post("findOneAndUpdate", handleSaveError);

const Contact = model("contact", contactSchema);

export default Contact;
