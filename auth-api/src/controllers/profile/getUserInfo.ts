import { Request, Response } from 'express';
import User from '../../models/User';
import { bucketName, s3ClientPersonal } from './updateProfilePic';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';




export const getUserInfo =  async (req: Request, res: Response) => {
         console.log('hit')
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ error: 'userId parameter is required' });
          }  

        const user = await User.findOne({ userId });

        if(userId){

            const key = `profilePic/${userId}`;

            const getObjectParams = {
                Bucket: bucketName,
                Key: key
               }

            const command = new GetObjectCommand(getObjectParams);
            const uploadURL = await getSignedUrl(s3ClientPersonal, command, { expiresIn: 36000})
            console.log(uploadURL, 'uploadURL')

            if (uploadURL) {
             user.profilePicAWSURL = uploadURL;
            }
          }

        
          res.status(200).json(user);


    } catch(err){
        res.status(500).json({ error: err.message || "Could not fetch top service by category" });

    }
}