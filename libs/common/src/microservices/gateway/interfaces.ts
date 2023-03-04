import { Request } from 'express';
export interface RequestInterface extends Request {
  userId: number;
}
