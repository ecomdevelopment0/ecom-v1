import style from "./brand.module.scss";
import { brandProvider } from "../../services/Brand/brandProvider";
import coming_soon_img from "../../assets/img-coming-soon.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Brand() {
  const [brands, setBrands] = useState<any[]>([]);
  const navigate = useNavigate();
  let response: any;
  async function getAllBrands() {
    response = await brandProvider.getAllBrands();
    setBrands(response?.rows);
  }
  const handleClick = (brandId: string) => {
    navigate(`/result/${brandId}?filterType=brand`);
  };
  useEffect(() => {
    getAllBrands();
  }, []);

  return (
    <>
      <div className={style.brand_container}>
        <h2>Choose by brands</h2>
        <div className={style.all_brands}>
          {brands.map((brand, index) => (
            <div
              onClick={() => handleClick(brand.brandId)}
              key={index}
              className={style.brand_div}
            >
              <img src={brand.imageURL || coming_soon_img} alt="brand-img" />
              <h3>{brand.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
