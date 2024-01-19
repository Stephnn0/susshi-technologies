import dotenv from 'dotenv'
import randomBytes from 'randombytes'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";


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



export async function generateUploadURL() {
    const rawBytes = await randomBytes(16)
    const imageName = rawBytes.toString('hex')
    const key = `services/${imageName}`;

    const params = ({
        Bucket: bucketName,
        Key: key,
    });

    const command = new PutObjectCommand(params)
    const uploadURL = await getSignedUrl(s3ClientPersonal, command, { expiresIn: 36000})

    return uploadURL
}


