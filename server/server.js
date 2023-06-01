import home from "./routes/home.js";
import history from "./routes/history.js";
import playlists from "./routes/playlists.js";
import auth from "./routes/auth.js"
import spotify from "./routes/spotify.js"
import { body } from 'express-validator';
import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from "cors";

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
app.use(express.json());
auth.configure(app);

// Load the routes
app.use(express.static(path.join(__dirname, '../client')));
app.use("/home", home);
app.use("/history", history);
app.use("/playlists", playlists);
app.use("/spotify", spotify);

app.post('/login', auth.authenticate(), (req, res) => { res.send({ redirectUrl: '/home' }) });

app.get("/logout", (req, res) => {
    if (req.session) {
        req.session.destroy();
        res.send({redirectUrl: "/"});
    } else {
        const err = new Error("You are not logged in!");
        err.status = 401;
        res.send(err);
    }
});

app.post('/register', [
    body('username')
    .notEmpty()
    .withMessage("Username cannot be empty")
    .isLength({min: 5})
    .withMessage("Username must be at least 5 characters long"),
    body('password')
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({min: 5})
    .withMessage("Password must be at least 5 characters long")
], auth.register);

app.listen(port, () => {
    console.log(`Hello we are on port: ${port}`);
});
