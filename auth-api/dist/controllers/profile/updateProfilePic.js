"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfilePic = exports.s3ClientPersonal = exports.secretAccessKey = exports.accessKeyId = exports.bucketRegion = exports.bucketName = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const client_s3_1 = require("@aws-sdk/client-s3");
const User_1 = __importDefault(require("../../models/User"));
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
const updateProfilePic = async (req, res) => {
    try {
        const { userId } = req.body;
        const file = req.file;
        console.log(file, userId);
        const user = await User_1.default.findOne({ userId });
        const key = `profilePic/${user.userId}`;
        const params = ({
            Bucket: exports.bucketName,
            Key: key,
            Body: file.buffer
        });
        const command = new client_s3_1.PutObjectCommand(params);
        await exports.s3ClientPersonal.send(command);
        res.status(201).json({ message: "profile pic updated" });
    }
    catch (err) {
        res.status(500).json({ error: err.message || "Could not create service" });
    }
};
exports.updateProfilePic = updateProfilePic;
exports.default = { updateProfilePic: exports.updateProfilePic };
//# sourceMappingURL=updateProfilePic.js.map