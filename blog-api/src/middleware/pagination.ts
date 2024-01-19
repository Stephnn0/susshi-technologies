import { Request, Response, NextFunction } from "express";
import { Model } from "mongoose"; // Import Model from Mongoose


interface PaginatedResults {
        next: {
          page: number;
          limit: number;
        } | null; 
      
        previous: {
          page: number;
          limit: number;
        } | null; 
      
        results: () => Promise<any[]>; 
      }

declare module 'express' {
    interface Response {
      paginatedResults?: any; // You can specify the type here
    }
  }


// paginatedResults(BlogPost) we past the blogpost model

export function paginatedResults<T extends Model<any>>(model: T) {
    return async (req: Request, res: Response, next: NextFunction) => {

        const { page, perPage } = req.query;

        const startIndex = (Number(page) - 1) * Number(perPage) //limit
        const endIndex = Number(page) * Number(perPage) //limit
        
        const results: PaginatedResults = {
            next: {
                page: 0,
                limit: 0
            },
            previous: {
                page: 0,
                limit: 0
            },
            results: null
        }
        
         if (endIndex < await model.countDocuments().exec()) {
          results.next = {
          page: Number(page) + 1,
          limit: Number(perPage)
        } }
        
        
        if (startIndex > 0) {
           results.previous = {
           page: Number(page) - 1,
           limit: Number(perPage)
        } }

        try {
            results.results = await model.find().sort({ date: -1 }).limit(Number(perPage)).skip(startIndex).exec

            res.paginatedResults = results
            console.log(' results results ',results)
            next();

        } catch(err) {
            res.status(500).json({ message: err.message})
        }
    }
}