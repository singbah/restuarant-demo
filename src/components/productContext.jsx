import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ProductContext = createContext(null);

export default function ProductProvider({ children }) {
  const [product, setProduct] = useState();
  const navigate = useNavigate()

  const viewProduct = (product_) => {
    setProduct(product_)
    navigate("/product")
  };

  return <ProductContext.Provider value={{ viewProduct, product}}>
    {children}
  </ProductContext.Provider>
}