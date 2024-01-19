import { Request, Response } from 'express';
import Admin, {AdminInferface} from '../../models/Admin';
const bcrypt = require('bcrypt');


export const handleNewUserAdmin = async (req: Request, res: Response) => {
  try {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ message: 'Username and password are required.' });

    // Check for duplicate usernames in the db
    const duplicate = await Admin.findOne({ username: user }).exec();
    if (duplicate) return res.sendStatus(409); // Conflict

    // Encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    // Create and store the new user
    const result = await Admin.create({
      username: user,
      password: hashedPwd,
    });

    console.log(result);

    res.status(201).json({ success: `New user ${user} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default { handleNewUserAdmin };