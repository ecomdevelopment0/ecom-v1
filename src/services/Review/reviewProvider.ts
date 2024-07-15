import { GenericPaths } from "../genericPaths";
import { getAPI, postAPI } from "../genericRequests";

interface ReviewProvider {
  getAllReviews(
    page?: number,
    limit?: number,
    categoryId?: string,
    brandId?: string,
    searchQuery?: string
  ): Promise<any>;
  addNewReview(id: string, data: any): Promise<any>;
}

export const reviewProvider: ReviewProvider = {
  async getAllReviews(
    page: number = 1,
    limit: number = 20,
    productId: string = "",
    isVerified: string = ""
  ): Promise<any> {
    try {
      const response = await getAPI(
        `${GenericPaths.GET_ALL_REVIEWS}?productId=${productId}&isVerified=${isVerified}&page=${page}&limit=${limit}`
      );
      return response;
    } catch (error: any) {
      return error.response.data;
    }
  },
  async addNewReview(id: string, data: any): Promise<any> {
    try {
      const response = await postAPI(
        GenericPaths.ADD_NEW_REVIEW + id,
        data
      );
      return response;
    } catch (error: any) {
      return error.response.data;
    }
  },
};
