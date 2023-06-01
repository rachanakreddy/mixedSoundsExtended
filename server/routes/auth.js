//import { body, check, validationResult } from 'express-validator';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import {getUser, registerUser} from "../db/user.js";
import bcrypt from 'bcrypt';
import session from 'express-session';

passport.serializeUser((user, done) => {
    done(null, user);
});
  
// Convert a unique identifier to a user object.
passport.deserializeUser(async (user, done) => {
    //const user = await getUser(user.name);
    done(null, user);
});

passport.use(new LocalStrategy(

    async (username, password, done) => { 

        const user = await getUser(username);

        if(user == null){
            return done(null, false);
        }

        const match = await bcrypt.compare(password, user.password);

        if(!match){
            return done(null, false);
        }

        return done(null, user);

}));

const register = async(req, res) => {
    
    const {username, password} = req.body;

    let user = await getUser(username);
    
    if (user !== null) {//user already in db
        res.sendStatus(500);
    } else {
    
        const hash = await bcrypt.hash(password, 10);
    
        let result = await registerUser(username, hash);
    
        if (result !== null) {
            res.send({ redirectUrl: '/home' });
        } else {
            console.log("register user equals null");
            res.sendStatus(500);
        }
    
    }

}

export default {

    configure: (app) => {
        app.use(session({
            secret: '326',
            resave: false,
            saveUninitialized: false
        }));
      app.use(passport.initialize());
      app.use(passport.session());
    }, 
    authenticate: () => {
        return passport.authenticate('local');
    }
    , register
};