import style from "./result.module.scss";
import rightArrow from "../../assets/right-arrow-icon.svg";
import no_result_img from "../../assets/no-result-img.svg";
import { useEffect, useState } from "react";
import SortDropdown from "../../components/SortDropdown/SortDropdown";
import SingleProduct from "../../components/SingleProduct/SingleProduct";
import Pagination from "../../components/Pagination/Pagination";
import { productProvider } from "../../services/Product/productProvider";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import { trio } from "ldrs";
import { sortProducts } from "../../utils/common";
trio.register();

async function fetchProducts({ queryKey }: any) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_key, { page, limit, filterType, id, searchQuery }] = queryKey;
  let res: any;
  if (filterType === "category") {
    res = await productProvider.getAllProducts(page, limit, id);
  } else if (filterType === "brand") {
    res = await productProvider.getAllProducts(page, limit, "", id);
  } else {
    res = await productProvider.getAllProducts(
      page,
      limit,
      "",
      "",
      searchQuery
    );
  }

  return res;
}

export default function Result() {
  const [products, setProducts] = useState<any[]>([]);
  const [response, setResponse] = useState<any>({});
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const filterType = searchParams.get("filterType");
  const searchQuery: any = searchParams.get("search");
  const [sortValue, setSortValue] = useState("recommended");

  const { data, isLoading } = useQuery(
    ["products", { page: currentPage, limit: 20, filterType, id, searchQuery }],
    fetchProducts,
    {
      keepPreviousData: true, // Keeps the previous data while fetching new data
    }
  );

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSortChange = (value: string) => {
    setSortValue(value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (data) {
      setResponse(data);
      setProducts(sortProducts(data?.rows, sortValue));
    }
  }, [data, sortValue]);

  return (
    <>
      {isLoading ? (
        <div className={style.loader}>
          <l-trio size="70" speed="1.3" color="#337CCF"></l-trio>
        </div>
      ) : (
        <>
          {response?.count === 0 ? (
            <div className={style.result_container}>
              <div className={style.no_result}>
                <img src={no_result_img} alt="" />
                <h1>No results found</h1>
                <p>We couldn’t find what you searched for.</p>
                <p>
                  Try searching again or share your product needs, and we'll do
                  our best to fulfill your request.
                </p>
                <button onClick={() => navigate("/")}>Go back</button>
              </div>
            </div>
          ) : (
            <div className={style.result_container}>
              <div className={style.path_shower}>
                <p>Home</p>
                <img src={rightArrow} alt="right-arrow-img" />
                <p>Search results “antivirus”</p>
              </div>
              <div className={style.result_info_div}>
                <h4>{response?.count} search results</h4>
                <SortDropdown onChange={handleSortChange} />
              </div>
              <div className={style.all_products}>
                {products &&
                  products.map((product, index) => (
                    <SingleProduct
                      key={index}
                      onSale={product.onSale}
                      productImg={product.productImg}
                      name={product.name}
                      cutPrice={product.actualPrice}
                      price={product.marketPrice}
                      productId={product.productId}
                    />
                  ))}
              </div>
              <div className={style.pagination_div}>
                <Pagination
                  currentPage={currentPage}
                  totalPages={response?.totalPages}
                  onPageChange={onPageChange}
                />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
