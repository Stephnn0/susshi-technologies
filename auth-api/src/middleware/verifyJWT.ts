import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');

interface CustomRequest extends Request {
    email: string; // Define the user property's type here
    roles: string[]; // Define the roles property's type here
  }

const verifyJWT = (req: CustomRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader) return res.sendStatus(401);

  const tokenArray = Array.isArray(authHeader) ? authHeader : [authHeader];
  const token = tokenArray.find(header => header.startsWith('Bearer '));

  if (!token) return res.sendStatus(401);
  const tokenValue = token.split(' ')[1];

  jwt.verify(
    tokenValue,
    process.env.ACCESS_TOKEN_SECRET as string, 
    (err: any, decoded: any) => {
      if (err) return res.sendStatus(403); // Invalid token
      req.email = decoded.UserInfo.email;
      req.roles = decoded.UserInfo.roles;
      next();
    }
  );
};

export default verifyJWT;
