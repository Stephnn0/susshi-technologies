import { Request, Response } from 'express';
import { S3Client, GetObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from 'dotenv'

dotenv.config();

export const bucketName = process.env.BUCKET_NAME
export const bucketRegion = process.env.BUCKET_REGION
export const accessKeyId = process.env.ACCESS_KEY
export const secretAccessKey = process.env.SECRET_ACCESS_KEY

export const s3ClientPersonal = new S3Client({
    credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey
    },
    region: bucketRegion,

});

export const getProfilePic =  async (req: Request, res: Response) => {
    console.log('hit')
    try {
        const { userId } = req.query;

        console.log(userId)
        
        let profileimg;
        if (!userId) {
            return res.status(400).json({ error: 'userId parameter is required' });
          }  
        
          if(userId){

            const key = `profilePic/${userId}`;

            const getObjectParams = {
                Bucket: bucketName,
                Key: key
               }

            const command = new GetObjectCommand(getObjectParams);
            console.log(command, 'pp')

            const uploadURL = await getSignedUrl(s3ClientPersonal, command, { expiresIn: 36000})
            profileimg = uploadURL
            console.log(profileimg,'profileimgkdkd')
          }
          res.status(200).json( profileimg );

    } catch(err){

    }

}

export default { getProfilePic };