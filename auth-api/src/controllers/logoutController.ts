import { Request, Response } from 'express';
import User, { IUser } from '../models/User'; // Import IUser interface and User model from your code



export const handleLogout = async (req: Request, res: Response): Promise<void> => {
  // On the client, also delete the accessToken

  const cookies = req.cookies;
  if (!cookies?.jwt) {
     res.sendStatus(204); // No content
     return;
  }
  const refreshToken = cookies.jwt;

  // Is refreshToken in the database?
  const foundUser: IUser | null = await User.findOne({ refreshToken }).exec();


  if (!foundUser) {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
   res.sendStatus(204);
   return;
  }

  // Delete refreshToken in the database
  foundUser.refreshToken = foundUser.refreshToken.filter((rt) => rt !== refreshToken);
  const result = await foundUser.save();
  console.log(result);

  res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
  res.sendStatus(204);
};

export default { handleLogout };
