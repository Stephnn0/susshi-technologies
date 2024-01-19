export interface Service {
    _id: number;
  
    serviceId: string,
    price: number,
  
    category: string;
    topic: string;
    description: string;
    overviewtopic: string
    overviewDescription: string
  
    benefits: Array<{
      _id: number;
      topic: string;
      description: string;
    }>;
  
    useCases: Array<{
      _id: number;
      topic: string;
      description: string;
    }>;
  
    title2: string;
    overview2: string;
    title3: string;
    overview3: string;

    imgUrl: string,
    awsUrl: string
  
  }


export interface Post {
    _id: number;
    mainTitle: string;
    introDescription: string;
    author: string
    awsUrl: string;
    date: string
    category: string;
    readTime: string;
    status: string;
    views: number;
    paragraphs: Array<{
        _id: number;
        topic: string;
        description: string;
        url: string
    }>;
}

export interface DoubleResponse {
    blogsWithFirstImage: Post[],
    resultsNextPrevious: {
      next: {
        limit: number,
        page: number
      },
      previous: {
        limit: number,
        page: number
      }
    }
  }

 export interface JwtPayload {
    UserInfo: {
      userId: Array<string>[],
      email: string
    }
  }

export type CartItemProps = {
    id: string,
    quantity: number
}

export interface User {
    userId: string;
  
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    refreshToken: string[];
  
    profilePicLink: string;
    profilePicAWSURL: string;
  
    phoneNumber: string;
    address: string
    createdAt: Date; 
    updatedAt: Date;
  
  }

  export interface OrderInterface {
    orderId: string; 
    customerId: string
    orderNumber: string; 
    // items: CustomOrderItem[]; 
    totalAmount: number; 
    orderDate: string; 
    status: string
    // status: OrderStatus; 
  }