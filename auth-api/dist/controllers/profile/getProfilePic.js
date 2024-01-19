"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfilePic = exports.s3ClientPersonal = exports.secretAccessKey = exports.accessKeyId = exports.bucketRegion = exports.bucketName = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.bucketName = process.env.BUCKET_NAME;
exports.bucketRegion = process.env.BUCKET_REGION;
exports.accessKeyId = process.env.ACCESS_KEY;
exports.secretAccessKey = process.env.SECRET_ACCESS_KEY;
exports.s3ClientPersonal = new client_s3_1.S3Client({
    credentials: {
        accessKeyId: exports.accessKeyId,
        secretAccessKey: exports.secretAccessKey
    },
    region: exports.bucketRegion,
});
const getProfilePic = async (req, res) => {
    console.log('hit');
    try {
        const { userId } = req.query;
        console.log(userId);
        let profileimg;
        if (!userId) {
            return res.status(400).json({ error: 'userId parameter is required' });
        }
        if (userId) {
            const key = `profilePic/${userId}`;
            const getObjectParams = {
                Bucket: exports.bucketName,
                Key: key
            };
            const command = new client_s3_1.GetObjectCommand(getObjectParams);
            console.log(command, 'pp');
            const uploadURL = await (0, s3_request_presigner_1.getSignedUrl)(exports.s3ClientPersonal, command, { expiresIn: 36000 });
            profileimg = uploadURL;
            console.log(profileimg, 'profileimgkdkd');
        }
        res.status(200).json(profileimg);
    }
    catch (err) {
    }
};
exports.getProfilePic = getProfilePic;
exports.default = { getProfilePic: exports.getProfilePic };
//# sourceMappingURL=getProfilePic.js.map