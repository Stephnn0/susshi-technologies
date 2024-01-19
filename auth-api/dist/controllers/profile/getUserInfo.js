"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserInfo = void 0;
const User_1 = __importDefault(require("../../models/User"));
const updateProfilePic_1 = require("./updateProfilePic");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const getUserInfo = async (req, res) => {
    console.log('hit');
    try {
        const { userId } = req.query;
        if (!userId) {
            return res.status(400).json({ error: 'userId parameter is required' });
        }
        const user = await User_1.default.findOne({ userId });
        if (userId) {
            const key = `profilePic/${userId}`;
            const getObjectParams = {
                Bucket: updateProfilePic_1.bucketName,
                Key: key
            };
            const command = new client_s3_1.GetObjectCommand(getObjectParams);
            const uploadURL = await (0, s3_request_presigner_1.getSignedUrl)(updateProfilePic_1.s3ClientPersonal, command, { expiresIn: 36000 });
            console.log(uploadURL, 'uploadURL');
            if (uploadURL) {
                user.profilePicAWSURL = uploadURL;
            }
        }
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({ error: err.message || "Could not fetch top service by category" });
    }
};
exports.getUserInfo = getUserInfo;
//# sourceMappingURL=getUserInfo.js.map