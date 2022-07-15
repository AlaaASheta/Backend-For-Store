import express, { Request, Response } from 'express';
import { userModel } from '../models/users';
import jwt from 'jsonwebtoken';
import verifyAuth from '../services/verifyAuth';

const user = new userModel;

const index = async (_req: Request, res: Response) => {
    try {
        const users = await user.index();
        res.json(users);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const users = await user.show(req.params.id as unknown as number);
        res.json(users);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const newUser = await user.create(req.body);
        res.json(newUser);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const updatedUser = await user.update(req.body);
        res.json(updatedUser);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

const deleteUser = async (req: Request, res: Response) => {
    try {
        const users = await user.delete(req.params.id as unknown as number);
        res.json(users);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

// API that login user with his email and password then response with his token
const login = async (req: Request, res: Response) => {
    try {
        const users = await user.loginAuth(req.body);
        var token = jwt.sign({ user: users }, process.env.TOKEN_SECRET as string);
        res.json(token);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

const user_routes = (app: express.Application) => {
    //using verifyAuthToken to check if the sended token in request is correct
    app.get('/users', verifyAuth.verifyAuthToken, index);
    app.get('/users/:id', verifyAuth.verifyAuthToken, show);
    // create doesn't need verifyAuthToken to any new user could add him self to the system
    app.post('/users', create);
    //using verifyUserToken to check if the sended token in request is belong to the user 
    //that sends the request to could update his data
    app.put('/users', verifyAuth.verifyUserToken, update);
    //using verifyUserToken to check if the sended token in request is belong to the user 
    //that sends the request to could delete him self
    app.delete('/users/:id', verifyAuth.verifyUserToken, deleteUser);
    app.post('/users/login', login);
}

export default user_routes;
