import Contact from "../models/Contact.js";
import HttpError from "../utils/HttpError.js";
import { ctrlWrapper } from "../decorators/index.js";

const getAll = async (req, res) => {
    const { _id: owner } = req.user;
    const result = await Contact.find({ owner }).populate("owner", "name email");
    res.json(result);
};

const getById = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findById(id);

    if (!result) {
        throw HttpError(404, `Contact with id=${id} not found `);
    }

    res.json(result);
};

const add = async (req, res) => {
    const { _id: owner } = req.user;
    const result = await Contact.create({ ...req.body, owner });
    res.status(201).json(result);
};

const removeById = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndDelete(id);

    if (!result) {
        throw HttpError(404, `Contact with id=${id} not found `);
    }

    res.json({
        message: "Delete success",
    });
};

const updateById = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

    if (!result) {
        throw HttpError(404, `Contact with id=${id} not found`);
    }

    res.json(result);
};

const updateStatusContact = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

    if (!result) {
        throw HttpError(404);
    }

    res.json(result);
};

export default {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    removeById: ctrlWrapper(removeById),
    updateById: ctrlWrapper(updateById),
    updateStatusContact: ctrlWrapper(updateStatusContact),
};
