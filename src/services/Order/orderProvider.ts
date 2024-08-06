import { GenericPaths } from "../genericPaths";
import { getAPI, postAPI } from "../genericRequests";

interface OrderProvider {
  getOrder(userId: string, page?: number, limit?: number): Promise<any>;
  createOrder(userId: string, data: any): Promise<any>;
}

export const orderProvider: OrderProvider = {
  async getOrder(
    userId: string,
    page: number = 1,
    limit: number = 20
  ): Promise<any> {
    try {
      const response = await getAPI(
        `${GenericPaths.ORDER}/${userId}?&page=${page}&limit=${limit}`
      );
      return response;
    } catch (error: any) {
      return error.response.data;
    }
  },
  async createOrder(userId: string, data: any): Promise<any> {
    try {
      const response = await postAPI(
        `${GenericPaths.ORDER}?userId=${userId}`,
        data
      );
      return response;
    } catch (error: any) {
      return error.response.data;
    }
  },
};
