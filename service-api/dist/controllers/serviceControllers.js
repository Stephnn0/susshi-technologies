"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteService = exports.updateService = exports.getServiceById = exports.getAllServices = exports.getTop8Services = exports.getFirstServiceByCategory = exports.createService = void 0;
const Service_1 = __importDefault(require("../models/Service"));
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const s3_1 = require("../s3");
const randombytes_1 = __importDefault(require("randombytes"));
const uuid_1 = require("uuid");
const createService = async (req, res) => {
    try {
        const { category, topic, description, overviewtopic, overviewDescription, benefits, useCases, title2, title3, overview2, overview3 } = req.body;
        const file = req.file;
        const benefitsJson = JSON.parse(benefits);
        const useCasesJson = JSON.parse(useCases);
        const rawBytes = await (0, randombytes_1.default)(16);
        const imageName = rawBytes.toString('hex');
        const key = `services/${imageName}`;
        const params = ({
            Bucket: s3_1.bucketName,
            Key: key,
            Body: file.buffer
        });
        const command = new client_s3_1.PutObjectCommand(params);
        await s3_1.s3ClientPersonal.send(command);
        const newService = new Service_1.default({
            price: 100,
            serviceId: (0, uuid_1.v4)(),
            category,
            topic,
            description,
            overviewtopic,
            overviewDescription,
            benefits: benefitsJson,
            useCases: useCasesJson,
            title2,
            title3,
            overview2,
            overview3,
            awsUrl: imageName
        });
        await newService.save();
        res.status(201).json(newService);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message || "Could not create service" });
    }
};
exports.createService = createService;
const getFirstServiceByCategory = async (req, res) => {
    try {
        const { category } = req.query;
        if (!category) {
            return res.status(400).json({ error: 'Category parameter is required' });
        }
        const topService = await Service_1.default.findOne({ category: category }).exec();
        if (!topService) {
            return res.status(404).json({ error: 'Service not found for the specified category' });
        }
        if (topService) {
            const key = `services/${topService.awsUrl}`;
            const getObjectParams = {
                Bucket: s3_1.bucketName,
                Key: key
            };
            const command = new client_s3_1.GetObjectCommand(getObjectParams);
            const uploadURL = await (0, s3_request_presigner_1.getSignedUrl)(s3_1.s3ClientPersonal, command, { expiresIn: 36000 });
            topService.imgUrl = uploadURL;
        }
        res.status(200).json(topService);
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Could not fetch top service by category" });
    }
};
exports.getFirstServiceByCategory = getFirstServiceByCategory;
const getTop8Services = async (_req, res) => {
    try {
        const top8BlogPosts = await Service_1.default.find().limit(8);
        res.status(200).json(top8BlogPosts);
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Could not fetch top 8 services" });
    }
};
exports.getTop8Services = getTop8Services;
const getAllServices = async (_req, res) => {
    try {
        const services = await Service_1.default.find().sort({ date: -1 });
        const servicesWithFirstImage = [];
        for (const service of services) {
            const { awsUrl } = service;
            const key = `services/${awsUrl}/`;
            const getObjectParams = {
                Bucket: s3_1.bucketName,
                Key: key
            };
            const command = new client_s3_1.ListObjectsCommand(getObjectParams);
            const { Contents } = await s3_1.s3ClientPersonal.send(command);
            if (Contents.length > 0) {
                const matchingObjects = [];
                for (const obj of Contents) {
                    const parts = obj.Key.split('/');
                    if (parts[1] === awsUrl) {
                        matchingObjects.push(obj.Key);
                    }
                    const firstFound = matchingObjects[0];
                    const firstImageUrl = `https://susshi-images.s3.us-east-1.amazonaws.com/${firstFound}`;
                    service.imgUrl = firstImageUrl;
                }
            }
            servicesWithFirstImage.push(service);
        }
        res.status(200).json(servicesWithFirstImage);
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Could not fetch all services" });
    }
};
exports.getAllServices = getAllServices;
const getServiceById = async (req, res) => {
};
exports.getServiceById = getServiceById;
const updateService = async (req, res) => {
};
exports.updateService = updateService;
const deleteService = async (req, res) => {
};
exports.deleteService = deleteService;
//# sourceMappingURL=serviceControllers.js.map