import { Product } from './IProduct';

export class Order {
    id: number;
    firstName: string;
    lastName: string;
    mobileNumber: string;
    status: string;
    mailId: string;
    address: string;
    itemList: Product[];
    orderDate: Date;
    deliveryType: string;
    totalAmount:number;
    deliveryBoyId: number;
  }