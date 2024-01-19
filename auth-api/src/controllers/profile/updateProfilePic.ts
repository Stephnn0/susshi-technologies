import dotenv from 'dotenv'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Request, Response } from 'express';
import User from '../../models/User';

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

export const updateProfilePic =  async (req: Request, res: Response) => {

    try {
        const { userId } = req.body;
        const file = req.file 
        console.log(file, userId)

        const user = await User.findOne({ userId });
        
        const key = `profilePic/${user.userId}`

        const params = ({
            Bucket: bucketName,
            Key: key,
            Body: file.buffer

        });

        const command = new PutObjectCommand(params)
        await s3ClientPersonal.send(command);

        res.status(201).json({ message: "profile pic updated"});

    } catch(err){
        res.status(500).json({ error: err.message || "Could not create service" });
    }
}

export default { updateProfilePic };