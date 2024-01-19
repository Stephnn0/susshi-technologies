export interface OrderInterface {
    orderId: string; 
    customerId: string
    orderNumber: string; 
    items: CustomOrderItem[]; 
    totalAmount: number; 
    orderDate: Date; 
    status: OrderStatus; 
  }
  
export interface CustomOrderItem {
    orderItemId: string; 
    service: string; 
    quantity: number; 
    subtotal: number; 
  }
  
export interface Service extends Document {
    category: ServiceCategory;
  
    serviceId: string;
    price: number;
  
    topic: string;
    description: string;
    overviewtopic: string;
    overviewDescription: string;

    benefits: Array<{
      topic: string;
      description: string;
    }>;
    useCases: Array<{
      topic: string;
      description: string;
    }>;
    
    title2: string;
    overview2: string;
    title3: string;
    overview3: string;
    imgUrl: string;
    awsUrl: string;
  
  }

export enum OrderStatus {
    Processing = "Processing",
    Shipped = "Shipped",
    Delivered = "Delivered",
    Completed = "Completed",
    Canceled = "Canceled",
  }

export  enum ServiceCategory {
    AUTOMATION = "automation",
    INDUSTRY = "industry",
    SECURITY = "security",
    AI = "ai",
    ANALYTICS = "analytics",
    SUSTAINABILITY = "sustainability",
    INFRASTRUCTURE = "infrastructure",
    NETWORKS = 'networks',
    DATABASES = "databases",
    SERVERS = "servers",
    DEVOPS = "devops",
    QUANTUM = "quantum",
    BLOCKCHAIN = "blockchain"
  }