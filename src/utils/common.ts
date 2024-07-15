export function calculatePercentageOff(
  actualPrice: number,
  marketPrice: number
): number {
  if (actualPrice < 0 || marketPrice < 0) {
    return 0;
  }
  const discount = ((actualPrice - marketPrice) / actualPrice) * 100;
  return discount;
}

export function calculateGST(totalAmount: number) {
  const gstPercentage = 0.18; // 18% as a decimal
  const gstAmount = totalAmount * gstPercentage;
  return gstAmount;
}

export const sortProducts = (products: any, sortValue: any) => {
  const sortedProducts = [...products];
  switch (sortValue) {
    case "low-to-high":
      return sortedProducts.sort((a, b) => a.marketPrice - b.marketPrice);
    case "high-to-low":
      return sortedProducts.sort((a, b) => b.marketPrice - a.marketPrice);
    case "newest-first":
      return sortedProducts.sort(
        (a: any, b: any) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
    default:
      return sortedProducts;
  }
};
