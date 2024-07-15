import { GenericPaths } from "../genericPaths";
import { getAPI } from "../genericRequests";

interface ProductProvider {
  getAllProducts(
    page?: number,
    limit?: number,
    categoryId?: string,
    brandId?: string,
    searchQuery?: string
  ): Promise<any>;
  getProductDetails(id: string): Promise<any>;
}

export const productProvider: ProductProvider = {
  async getAllProducts(
    page: number = 1,
    limit: number = 20,
    categoryId: string = "",
    brandId: string = "",
    searchQuery: string = ""
  ): Promise<any> {
    try {
      const response = await getAPI(
        `${GenericPaths.PRODUCTS}?categoryId=${categoryId}&brandId=${brandId}&page=${page}&limit=${limit}&search=${searchQuery}`
      );
      return response;
    } catch (error: any) {
      return error.response.data;
    }
  },
  async getProductDetails(id: string): Promise<any> {
    try {
      const response = await getAPI(GenericPaths.GET_PRODUCT_DETAILS + id);
      return response;
    } catch (error: any) {
      return error.response.data;
    }
  },
};
