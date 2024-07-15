import { GenericPaths } from "../genericPaths";
import { getAPI, postAPI } from "../genericRequests";

interface CartProvider {
  updateCart(
    userId: string,
    products: [{ productId: string; quantity: number }]
  ): Promise<any>;
  getCart(userId: string): Promise<any>;
  addToCart(userId: string, productId: string, quantity?: number): Promise<any>;
  removeFromCart(
    userId: string,
    productId: string,
    prod?: string
  ): Promise<any>;
}

export const cartProvider: CartProvider = {
  async updateCart(
    userId: string,
    products: [{ productId: string; quantity: number }]
  ): Promise<any> {
    try {
      const response = await postAPI(GenericPaths.CART + userId, { products });
      return response;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  async addToCart(
    userId: string,
    productId: string,
    quantity?: number
  ): Promise<any> {
    try {
      const response = await postAPI(GenericPaths.CART_ADD + userId, {
        productId,
        quantity
      });
      return response;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  async removeFromCart(
    userId: string,
    productId: string,
    prod?: string
  ): Promise<any> {
    try {
      const response = await postAPI(
        GenericPaths.CART_REMOVE + userId + "&prod=" + prod,
        {
          productId,
        }
      );
      return response;
    } catch (error: any) {
      throw error.response.data;
    }
  },

  async getCart(userId: string): Promise<any> {
    try {
      const response = await getAPI(GenericPaths.CART + userId);
      return response;
    } catch (error: any) {
      throw error.response.data;
    }
  },
};
