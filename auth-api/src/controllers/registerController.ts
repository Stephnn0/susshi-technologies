import { Request, Response } from 'express';
import User from '../models/User';
const bcrypt = require('bcrypt');
import { v4 as uuidv4 } from 'uuid';

function isValidEmail(email: string) {
  // Use a regular expression or a library like validator.js to validate the email format.
  // Here's a simple regex pattern for email validation.
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isStrongPassword(password: string) {
  // Check for password strength (at least 8 characters, contains letters, numbers, and special characters)
  const passwordRegex = /^(?=(.*[a-z]){3,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/;
  return passwordRegex.test(password);
}

//REGEX EXPLANATION
// ^                               start anchor
// (?=(.*[a-z]){3,})               lowercase letters. {3,} indicates that you want 3 of this group
// (?=(.*[A-Z]){2,})               uppercase letters. {2,} indicates that you want 2 of this group
// (?=(.*[0-9]){2,})               numbers. {2,} indicates that you want 2 of this group
// (?=(.*[!@#$%^&*()\-__+.]){1,})  all the special characters in the [] fields. The ones used by regex are escaped by using the \ or the character itself. {1,} is redundant, but good practice, in case you change that to more than 1 in the future. Also keeps all the groups consistent
// {8,}                            indicates that you want 8 or more
// $   


export const handleNewUser = async (req: Request, res: Response) => {
  try {
    const { pwd, firstName, lastName, email } = req.body;
    // if (!email || !pwd || !firstName || !lastName) return res.status(400).json({ message: 'Username and password are required.' });

    // Check if the provided email is a valid email address
    if (!isValidEmail(email)) {
          return res.status(400).json({ message: 'Invalid email address.' });
     }

     if (!isStrongPassword(pwd)) {
      return res.status(400).json({
        message: 'Password must be at least 8 characters long and contain a mix of letters, numbers, and special characters.',
      });
    }

    // Check for duplicate usernames in the db
    const duplicate = await User.findOne({ email: email }).exec();
    if (duplicate) return res.sendStatus(409); // Conflict

    // Encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    // create id
    const id = uuidv4();

    // Create and store the new user
    const result = await User.create({
      userId: id,
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: hashedPwd,
    });

    // console.log(result);

    res.status(201).json({ success: `New user ${email} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default { handleNewUser };


