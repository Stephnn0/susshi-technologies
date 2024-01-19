import { Request, Response } from "express";
import Service from "../models/Service";
import { GetObjectCommand, PutObjectCommand, ListObjectsCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { bucketName, s3ClientPersonal } from "../s3"
import randomBytes from "randombytes";
import { v4 as uuidv4 } from 'uuid';



export const createService = async (req: Request, res: Response) => {
    //     if(!req.body?.category || !req.body?.topic || !req.body?.description ||
    //          !req.body?.overviewtopic || !req.body?.overviewDescription || 
    //         !req.body?.benefits || !req.body?.useCases || !req.body?.solutionsDesc || !req.body?.productDesc
    //          ) {
    //     return res.status(400).json({'meesage': 'fields required'})
    // }
    try {
        const { category,
                topic,
                description,
                overviewtopic,
                overviewDescription,
                benefits,
                useCases,
                title2,
                title3,
                overview2,
                overview3 } = req.body;

        const file = req.file 
            
        const benefitsJson = JSON.parse(benefits); 
        const useCasesJson = JSON.parse(useCases); 

        const rawBytes = await randomBytes(16)
        const imageName = rawBytes.toString('hex')
    
        const key = `services/${imageName}`;
    
        const params = ({
            Bucket: bucketName,
            Key: key,
            Body: file.buffer

        });
        const command = new PutObjectCommand(params)
        await s3ClientPersonal.send(command);

        
        const newService = new Service({
            price: 100,
            serviceId: uuidv4(),

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
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message || "Could not create service" });

    }

}

export const getFirstServiceByCategory = async (req: Request, res: Response) => {
    try {
      const { category } = req.query;
  
      if (!category) {
        return res.status(400).json({ error: 'Category parameter is required' });
      }
  
      const topService = await Service.findOne({ category: category as string }).exec();
  
      if (!topService) {
        return res.status(404).json({ error: 'Service not found for the specified category' });
      }

      if(topService){
        const key = `services/${topService.awsUrl}`;

        const getObjectParams = {
            Bucket: bucketName,
            Key: key
           }
        const command = new GetObjectCommand(getObjectParams);
        const uploadURL = await getSignedUrl(s3ClientPersonal, command, { expiresIn: 36000})
        topService.imgUrl = uploadURL;
      }
  
      res.status(200).json(topService);
    } catch (error) {
      res.status(500).json({ error: error.message || "Could not fetch top service by category" });
    }
  };
  

export const getTop8Services = async (_req: Request, res: Response) => {
    try {
        const top8BlogPosts = await Service.find().limit(8);
        res.status(200).json(top8BlogPosts);

    } catch(error){
        res.status(500).json({ error: error.message ||"Could not fetch top 8 services" });
    }
}


export const getAllServices = async (_req: Request, res: Response) => {
    try {
        const services = await Service.find().sort({ date: -1 });

        const servicesWithFirstImage = [];

        for (const service of services) { 
            const { awsUrl } = service;
            const key = `services/${awsUrl}/`;

            const getObjectParams = {
                Bucket: bucketName,
                Key: key
          }
        
          const command = new ListObjectsCommand(getObjectParams);
          const { Contents } = await s3ClientPersonal.send(command);
          
          if (Contents.length > 0) { 

            const matchingObjects = []
            for (const obj of Contents){
                const parts = obj.Key.split('/');
                if(parts[1] === awsUrl){
                    matchingObjects.push(obj.Key)
                }
                const firstFound = matchingObjects[0]
                const firstImageUrl = `https://susshi-images.s3.us-east-1.amazonaws.com/${firstFound}`;
                service.imgUrl = firstImageUrl
            }
          }
          servicesWithFirstImage.push(service)
        }
        res.status(200).json(servicesWithFirstImage);

    } catch(error){
        res.status(500).json({ error: error.message ||"Could not fetch all services" });
    }
}



export const getServiceById = async (req: Request, res: Response) => {
}


export const updateService = async (req: Request, res: Response) => {
}

export const deleteService = async (req: Request, res: Response) => {
}