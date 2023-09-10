import app from "./app.js";
import mongoose from "mongoose";

const { DB_HOST, PORT = 3000 } = process.env;
//! After the hw is done, don't forget to deploy the project (master branch) to render.com

mongoose
    .connect(DB_HOST)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running. Use our API on port: ${PORT}`);
            console.log("Database connection successful");
        });
    })
    .catch((error) => {
        console.log(error.message);
        process.exit(1);
    });
