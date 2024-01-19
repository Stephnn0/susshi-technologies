"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUploadURL = exports.s3ClientPersonal = exports.secretAccessKey = exports.accessKeyId = exports.bucketRegion = exports.bucketName = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const randombytes_1 = __importDefault(require("randombytes"));
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
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
async function generateUploadURL() {
    const rawBytes = await (0, randombytes_1.default)(16);
    const imageName = rawBytes.toString('hex');
    const key = `services/${imageName}`;
    const params = ({
        Bucket: exports.bucketName,
        Key: key,
    });
    const command = new client_s3_1.PutObjectCommand(params);
    const uploadURL = await (0, s3_request_presigner_1.getSignedUrl)(exports.s3ClientPersonal, command, { expiresIn: 36000 });
    return uploadURL;
}
exports.generateUploadURL = generateUploadURL;
//# sourceMappingURL=s3.js.map