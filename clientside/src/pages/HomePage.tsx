import { ChangeEvent, useEffect, useState } from "react";
import { getAllCategories, getAllProducts } from "../utils/helpers";
import HomeLayout from "../components/Layout/HomeLayout";
import ProductCard from "../components/ProductCard";
import "./index.css";
import { categoryType, productType } from "../utils/types";

type Props = {};

const HomePage = (props: Props) => {
  const [products, setProducts] = useState<productType[]>([]);
  const [allProducts, setAllProducts] = useState<productType[]>([]);
  const [categories, setCategories] = useState<categoryType[]>([]);
  const [lowest, setLowest] = useState<number>(0);
  const [highest, setHighest] = useState<number>(NaN);

  useEffect(() => {
    getAllProducts(setAllProducts);
    getAllProducts(setProducts);
    getAllCategories(setCategories);
  }, []);

  const setPrice = () => {
    console.log(lowest, highest);
    const priceFilteredProducts = allProducts.filter(
      (product: productType) =>
        product.price > lowest && product.price < highest
    );

    setProducts(priceFilteredProducts);
  };

  const handleFilterSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    const filterCategory = e.target.value;

    if (filterCategory !== "all") {
      const filteredProducts = allProducts.filter(
        (product) => product.category == filterCategory
      );
      setProducts(filteredProducts);
    } else {
      setProducts(allProducts);
    }
  };

  return (
    <>
      <HomeLayout title="Best Offers!">
        <div className="flex flex-col justify-center items-center pb-10">
          <div className="flex justify-center w-full items-center ">
            <div className="shadow-md flex gap-4 justify-between items-center my-2 mb-20 mt-10 py-2 px-4 rounded-md">
              <div className="flex flex-col ">
                <label htmlFor="category" className="text-center">
                  Filter by Category
                </label>
                <select
                  name="category"
                  defaultValue="all"
                  id="category"
                  onChange={handleFilterSelect}
                >
                  <option value="all">All</option>
                  {categories.map((category: categoryType) => (
                    <option value={category._id}>{category.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <span className="text-center">Price Filter</span>

                <div className="flex justify-center items-center flex-wrap">
                  <div>
                    <label htmlFor="from">From:</label>
                    <input
                      type="number"
                      id="from"
                      defaultValue={0}
                      className="w-[5rem]"
                      onChange={(e) => setLowest(Number(e.target.value))}
                    />
                  </div>
                  <div className="">
                    <label htmlFor="from">To:</label>
                    <input
                      type="number"
                      id="to"
                      className="w-[5rem]"
                      onChange={(e) => setHighest(Number(e.target.value))}
                    />
                  </div>

                  <button
                    className="bg-[#7e22ce] group hover:translate-y-[-2px] transition-all text-[#ffffff]  font-bold text-base  p-3 rounded-lg hover:bg-purple-800 active:scale-95 transform"
                    onClick={setPrice}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* product grid */}

          <div className="product-grid">
            {products.map((product) => (
              <ProductCard product={product} />
            ))}
          </div>
        </div>
      </HomeLayout>
    </>
  );
};

export default HomePage;
