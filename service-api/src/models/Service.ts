import mongoose, { Document, Schema } from "mongoose";
import { ServiceCategory, Service} from "../types/types";


  const BenefitSchema = new Schema({
    topic: { type: String, required: true },
    description: { type: String, required: true },
  });

  const useCasesSchema = new Schema({
    topic: { type: String, required: true },
    description: { type: String, required: true },
  });

  const ServiceSchema = new Schema<Service>({
    serviceId: {type: String, required: true },
    price: {type: Number, required: true },

    category: {
      type: String,
      enum: Object.values(ServiceCategory), // Only allows values from the enum
      required: true,
    },
    topic: { type: String, required: true },
    description: { type: String, required: true },
    overviewtopic: { type: String, required: true },
    overviewDescription: { type: String, required: true },
    benefits: [BenefitSchema],
    useCases: [useCasesSchema],

    title2: { type: String, required: true },
    overview2: { type: String, required: true },
    title3: { type: String, required: true },
    overview3: { type: String, required: true },

    imgUrl: { type: String, default: '' },
    awsUrl: { type: String, default: '' },

  });
  
const ServiceModel = mongoose.model<Service>('Service', ServiceSchema);

export default ServiceModel;