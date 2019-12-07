import { Address } from './IAddress';

export class Customer {
    id: number;
    firstName: string;
    lastName: string;
    mobileNumber: string;
    mailId: string;
    addresses: Address[];
    active: boolean;
  }