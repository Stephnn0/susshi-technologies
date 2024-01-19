import { Request, Response } from 'express';
import Admin, {AdminInferface} from '../../models/Admin'; // Assuming you have a User model defined



export const handleLogoutAdmin = async (req: Request, res: Response): Promise<void> => {
  // On the client, also delete the accessToken

  const cookies = req.cookies;
  if (!cookies?.jwt) {
     res.sendStatus(204); // No content
     return;
  }
  const refreshToken = cookies.jwt;

  // Is refreshToken in the database?
  const foundUser: AdminInferface | null = await Admin.findOne({ refreshToken }).exec();


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

export default { handleLogoutAdmin };