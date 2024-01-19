import { Request, Response } from 'express';
import User, { IUser } from '../models/User'; // Assuming you have a User model defined
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


export const handleLogin = async (req: Request, res: Response) => {
  try {
    const cookies = req.cookies;
    console.log(`cookie available at login: ${JSON.stringify(cookies)}`);


    const { email, pwd } = req.body;
    if (!email || !pwd) return res.status(400).json({ message: 'Email and password are required.' });




    const foundUser: IUser | null = await User.findOne({ email: email }).exec();
    if (!foundUser) return res.sendStatus(401); // Unauthorized

    // Evaluate password
    const match = await bcrypt.compare(pwd, foundUser.password);


    if (match) {

      const roles = Object.values(foundUser.roles).filter(Boolean);
      const id = Object.values(foundUser.userId);


      // Create JWTs
      const accessToken = jwt.sign(
        {
          UserInfo: {
            email: foundUser.email,
            roles: roles,
            user: id
          },
        },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: '50m' }
      );

      
      const newRefreshToken = jwt.sign(
        { email: foundUser.email },
        process.env.REFRESH_TOKEN_SECRET as string,
        { expiresIn: '7d' }
      );




      let newRefreshTokenArray =
        !cookies?.jwt
          ? foundUser.refreshToken
          : foundUser.refreshToken.filter((rt) => rt !== cookies.jwt);

      

      if (cookies?.jwt) {
        const refreshToken = cookies.jwt;
        const foundToken = await User.findOne({ refreshToken }).exec();

        // Detected refresh token reuse!
        if (!foundToken) {
          console.log('attempted refresh token reuse at login!');
          // Clear out ALL previous refresh tokens
          newRefreshTokenArray = [];
        }

        res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
      }

      // Saving refreshToken with the current user
      foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
      const result = await foundUser.save();

      // Creates a Secure Cookie with the refresh token
      res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 });

      // Send authorization roles and access token to the user
      // res.json({ roles, accessToken });
      res.json({ accessToken });



    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default { handleLogin };
