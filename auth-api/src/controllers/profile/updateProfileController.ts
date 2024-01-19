import { Request, Response } from 'express';
import User from './../../models/User'; // Import your User model
import bcrypt from 'bcrypt';



export const UserController = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const { pwd, firstName, lastName, email } = req.body;

      if (!email || !firstName || !lastName || !pwd) {
        return res.status(400).json({ message: 'First Name, Last Name, and Email are required.' });
      }

      // Find the user by userId
      const user = await User.findOne({ userId });

      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      // Update user information
      if (email) {
        user.email = email;
      }
      if (firstName) {
        user.firstName = firstName;
      }
      if (lastName) {
        user.lastName = lastName;
      }
      if (pwd) {
        // Encrypt the new password
        const hashedPwd = await bcrypt.hash(pwd, 10);
        user.password = hashedPwd;
      }

      // Save the updated user
      await user.save();

      res.status(200).json({ success: `User information updated for user ${user.email}` });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

export default UserController;