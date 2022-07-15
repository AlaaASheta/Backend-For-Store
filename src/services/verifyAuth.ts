import jwt from "jsonwebtoken";
import { Request, Response } from 'express';


//Function to check the sended token in the request
const verifyAuthToken = (req: Request, res: Response, next: Function) => {
    try {
        const authorization = req.headers.authorization as string;
        //split token to remove word "Bearer"
        const token = authorization.split(' ')[1];
        jwt.verify(token, process.env.TOKEN_SECRET as string);
        next();
    } catch (error) {
        res.status(401);
        res.json('Invalid Token')
    }
}

//Function to check the sended token in the request is belong to the user that send the request
const verifyUserToken = (req: Request, res: Response, next: Function) => {
    try {
        const authorization = req.headers.authorization as string;
        //split token to remove word "Bearer"
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);
        if (req.params.user_id) {
            if ((decoded as jwt.JwtPayload).user.id != req.params.user_id) {
                throw new Error('User id does not match!')
            }
        } else if (req.params.id) {
            if ((decoded as jwt.JwtPayload).user.id != req.params.id) {
                throw new Error('User id does not match!')
            }
        }
        else {
            if ((decoded as jwt.JwtPayload).user.id != req.body.id) {
                throw new Error('User id does not match!')
            }
        }
        next();
    } catch (error) {
        res.status(401);
        res.json('Invalid Token')
    }
}

export default { verifyAuthToken, verifyUserToken };