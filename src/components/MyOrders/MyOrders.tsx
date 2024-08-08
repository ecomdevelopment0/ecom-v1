import style from "./my-orders.module.scss";
import searchIcon from "../../assets/search-icon.svg";
import productImg from "../../assets/product-img.png";
// import filterIcon from "../../assets/filter-icon-blue.svg";
import rightArrow from "../../assets/right-arrow-icon.svg";
import { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";
import { useQuery } from "react-query";
import { orderProvider } from "../../services/Order/orderProvider";
import { localStorageProvider } from "../../utils/methods";
import { GenericPaths } from "../../services/genericPaths";
import { useAppSelector } from "../../hooks/hooks";
import { convertDate } from "../../utils/common";

const authFromLocalStorage = localStorageProvider.get(
  GenericPaths.AUTH_DATA_LOCAL_STORAGE
);

async function fetchOrders({ queryKey }: any) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_key, { page, limit, id }] = queryKey;
  return await orderProvider.getOrders(id, page, limit);
}

export default function MyOrders() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [response, setResponse] = useState<any>({});
  const [orders, setOrders] = useState<any[]>([]);
  const authFromRedux = useAppSelector((state) => state.auth.user);
  const authData = authFromLocalStorage || authFromRedux;

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const { data, isLoading } = useQuery(
    ["orders", { page: currentPage, limit: 20, id: authData?.userId }],
    fetchOrders,
    {
      keepPreviousData: true, // Keeps the previous data while fetching new data
    }
  );
  useEffect(() => {
    window.scrollTo(0, 0);
    if (data) {
      setResponse(data);
      setOrders(data?.data);
      setTotalPages(response?.totalPages);
    }
  }, [data, response?.totalPages]);

  return (
    <>
      {isLoading ? (
        <div className={style.loader}>
          <l-trio size="70" speed="1.3" color="#337CCF"></l-trio>
        </div>
      ) : (
        <div className={style.my_orders_container}>
          <div className={style.heading_div}>
            <h2>All orders</h2>
            <div className={style.search_filter}>
              <div className={style.search_div}>
                <img src={searchIcon} alt="" />
                <input type="text" placeholder="Search in orders" />
              </div>
              <div className={style.filter_div}>
                <button>
                  <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.49992 4.16676C7.2789 4.16676 7.06694 4.25455 6.91066 4.41083C6.75438 4.56711 6.66659 4.77908 6.66659 5.00009C6.66659 5.2211 6.75438 5.43306 6.91066 5.58934C7.06694 5.74562 7.2789 5.83342 7.49992 5.83342C7.72093 5.83342 7.93289 5.74562 8.08917 5.58934C8.24545 5.43306 8.33325 5.2211 8.33325 5.00009C8.33325 4.77908 8.24545 4.56711 8.08917 4.41083C7.93289 4.25455 7.72093 4.16676 7.49992 4.16676ZM5.14159 4.16676C5.31375 3.67881 5.63303 3.25628 6.05542 2.95741C6.4778 2.65854 6.98249 2.49805 7.49992 2.49805C8.01735 2.49805 8.52204 2.65854 8.94442 2.95741C9.3668 3.25628 9.68608 3.67881 9.85825 4.16676H15.8333C16.0543 4.16676 16.2662 4.25455 16.4225 4.41083C16.5788 4.56711 16.6666 4.77908 16.6666 5.00009C16.6666 5.2211 16.5788 5.43306 16.4225 5.58934C16.2662 5.74562 16.0543 5.83342 15.8333 5.83342H9.85825C9.68608 6.32137 9.3668 6.74389 8.94442 7.04276C8.52204 7.34163 8.01735 7.50213 7.49992 7.50213C6.98249 7.50213 6.4778 7.34163 6.05542 7.04276C5.63303 6.74389 5.31375 6.32137 5.14159 5.83342H4.16659C3.94557 5.83342 3.73361 5.74562 3.57733 5.58934C3.42105 5.43306 3.33325 5.2211 3.33325 5.00009C3.33325 4.77908 3.42105 4.56711 3.57733 4.41083C3.73361 4.25455 3.94557 4.16676 4.16659 4.16676H5.14159ZM12.4999 9.16676C12.2789 9.16676 12.0669 9.25455 11.9107 9.41083C11.7544 9.56711 11.6666 9.77908 11.6666 10.0001C11.6666 10.2211 11.7544 10.4331 11.9107 10.5893C12.0669 10.7456 12.2789 10.8334 12.4999 10.8334C12.7209 10.8334 12.9329 10.7456 13.0892 10.5893C13.2455 10.4331 13.3333 10.2211 13.3333 10.0001C13.3333 9.77908 13.2455 9.56711 13.0892 9.41083C12.9329 9.25455 12.7209 9.16676 12.4999 9.16676ZM10.1416 9.16676C10.3138 8.67881 10.633 8.25628 11.0554 7.95741C11.4778 7.65854 11.9825 7.49805 12.4999 7.49805C13.0173 7.49805 13.522 7.65854 13.9444 7.95741C14.3668 8.25628 14.6861 8.67881 14.8583 9.16676H15.8333C16.0543 9.16676 16.2662 9.25455 16.4225 9.41083C16.5788 9.56711 16.6666 9.77908 16.6666 10.0001C16.6666 10.2211 16.5788 10.4331 16.4225 10.5893C16.2662 10.7456 16.0543 10.8334 15.8333 10.8334H14.8583C14.6861 11.3214 14.3668 11.7439 13.9444 12.0428C13.522 12.3416 13.0173 12.5021 12.4999 12.5021C11.9825 12.5021 11.4778 12.3416 11.0554 12.0428C10.633 11.7439 10.3138 11.3214 10.1416 10.8334H4.16659C3.94557 10.8334 3.73361 10.7456 3.57733 10.5893C3.42105 10.4331 3.33325 10.2211 3.33325 10.0001C3.33325 9.77908 3.42105 9.56711 3.57733 9.41083C3.73361 9.25455 3.94557 9.16676 4.16659 9.16676H10.1416ZM7.49992 14.1668C7.2789 14.1668 7.06694 14.2546 6.91066 14.4108C6.75438 14.5671 6.66659 14.7791 6.66659 15.0001C6.66659 15.2211 6.75438 15.4331 6.91066 15.5893C7.06694 15.7456 7.2789 15.8334 7.49992 15.8334C7.72093 15.8334 7.93289 15.7456 8.08917 15.5893C8.24545 15.4331 8.33325 15.2211 8.33325 15.0001C8.33325 14.7791 8.24545 14.5671 8.08917 14.4108C7.93289 14.2546 7.72093 14.1668 7.49992 14.1668ZM5.14159 14.1668C5.31375 13.6788 5.63303 13.2563 6.05542 12.9574C6.4778 12.6585 6.98249 12.498 7.49992 12.498C8.01735 12.498 8.52204 12.6585 8.94442 12.9574C9.3668 13.2563 9.68608 13.6788 9.85825 14.1668H15.8333C16.0543 14.1668 16.2662 14.2546 16.4225 14.4108C16.5788 14.5671 16.6666 14.7791 16.6666 15.0001C16.6666 15.2211 16.5788 15.4331 16.4225 15.5893C16.2662 15.7456 16.0543 15.8334 15.8333 15.8334H9.85825C9.68608 16.3214 9.3668 16.7439 8.94442 17.0428C8.52204 17.3416 8.01735 17.5021 7.49992 17.5021C6.98249 17.5021 6.4778 17.3416 6.05542 17.0428C5.63303 16.7439 5.31375 16.3214 5.14159 15.8334H4.16659C3.94557 15.8334 3.73361 15.7456 3.57733 15.5893C3.42105 15.4331 3.33325 15.2211 3.33325 15.0001C3.33325 14.7791 3.42105 14.5671 3.57733 14.4108C3.73361 14.2546 3.94557 14.1668 4.16659 14.1668H5.14159Z" />
                  </svg>

                  <p>FILTER</p>
                </button>
              </div>
            </div>
          </div>

          <div className={style.order_content}>
            <div className={style.order_list}>
              {orders?.map((o: any, index: any) => (
                <div key={index}>
                  {o?.products?.map((p: any, ind: any) => (
                    <div key={ind} className={style.single_order}>
                      <div className={style.order_details}>
                        <div className={style.order_img}>
                          <img src={p.productImg || productImg} alt="" />
                        </div>
                        <div className={style.order_name_date}>
                          <h5>{p.name}</h5>
                          <p>
                            Delivered on{" "}
                            {o.createdAt ? convertDate(o.createdAt) : ""}
                          </p>
                        </div>
                      </div>
                      <div className={style.arrow_div}>
                        <img src={rightArrow} alt="" />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className={style.pagination_div}>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
