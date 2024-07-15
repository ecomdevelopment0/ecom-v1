import { GenericPaths } from "../genericPaths";
import { getAPI } from "../genericRequests";

interface BrandProvider {
    getAllBrands(
        page?: number,
        limit?: number
      ): Promise<any>;
}

export const brandProvider: BrandProvider = {
    async getAllBrands(
        page: number = 1,
        limit: number = 20
      ): Promise<any> {
        try {
          const response = await getAPI(
            `${GenericPaths.BRANDS}?page=${page}&limit=${limit}`
          );
          return response;
        } catch (error: any) {
          return error.response.data;
        }
      },
};
