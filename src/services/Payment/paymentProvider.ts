import { GenericPaths } from "../genericPaths";
import { postAPI } from "../genericRequests";

interface PaymentProvider {
  intitiatePayment(userId: string): Promise<any>;
  checkPayment(userId: string, data: any): Promise<any>;
  failedPayment(userId: string, data: any): Promise<any>;
  intitiatePaymentIndividual(userId: string, data: any): Promise<any>;
}

export const paymentProvider: PaymentProvider = {
  async intitiatePayment(userId: string): Promise<any> {
    try {
      const response = await postAPI(
        `${GenericPaths.INITIATE_PAYMENT}?userId=${userId}`,
        {}
      );
      return response;
    } catch (error: any) {
      return error.response.data;
    }
  },
  async checkPayment(userId: string, data: any): Promise<any> {
    try {
      const response = await postAPI(
        `${GenericPaths.CHECK_PAYMENT}?userId=${userId}`,
        data
      );
      return response;
    } catch (error: any) {
      return error.response.data;
    }
  },
  async failedPayment(userId: string, data: any): Promise<any> {
    try {
      const response = await postAPI(
        `${GenericPaths.PAYMENT_FAILED}?userId=${userId}`,
        data
      );
      return response;
    } catch (error: any) {
      return error.response.data;
    }
  },
  async intitiatePaymentIndividual(userId: string, data: any): Promise<any> {
    try {
      const response = await postAPI(
        `${GenericPaths.INITIATE_PAYMENT_INDIVIDUAL}?userId=${userId}`,
        data
      );
      return response;
    } catch (error: any) {
      return error.response.data;
    }
  },
};
