import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { addToCart } from "../redux/user/userThunk";
import { ProductCard } from "../components/ProductCard";

export const ProductDetails = () => {
  const { products } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const [thumbnail, setThumbnail] = React.useState(null);
  const [relatedProducts, setRelatedProducts] = React.useState([]);
  const product = products.find((product) => product._id === id);

  useEffect(() => {
    if (products.length > 0) {
      let productCopy = [...products];
      productCopy = productCopy.filter(
        (item) => product.category === item.category
      );
      setRelatedProducts(productCopy.slice(0, 5));
    }
  }, [products]);

  useEffect(() => {
    setThumbnail(product?.image[0] ? product.image[0] : null);
  }, [product]);
  return (
    product && (
      <div className="mt-12">
        <p>
          <Link to={"/"}>Home</Link> /<Link to={"/products"}> Products</Link> /
          <Link to={`/products/${product.category.toLowerCase()}`}>
            {" "}
            {product.category}
          </Link>{" "}
          /<span className="text-[#4fbf8b]"> {product.name}</span>
        </p>

        <div className="flex flex-col md:flex-row gap-16 mt-4">
          <div className="flex gap-3">
            <div className="flex flex-col gap-3">
              {product.image.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setThumbnail(image)}
                  className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer"
                >
                  <img src={image} alt={`Thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>

            <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
              <img src={thumbnail} alt="Selected product" />
            </div>
          </div>

          <div className="text-sm w-full md:w-1/2">
            <h1 className="text-3xl font-medium">{product.name}</h1>

            <div className="flex items-center gap-0.5 mt-1">
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <img
                    key={i}
                    className="md:w-4 w-3.5"
                    src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                    alt=""
                  />
                ))}
              <p className="text-base ml-2">({4})</p>
            </div>

            <div className="mt-6">
              <p className="text-gray-500/70 line-through">
                MRP: ${product.price}
              </p>
              <p className="text-2xl font-medium">MRP: ${product.offerPrice}</p>
              <span className="text-gray-500/70">(inclusive of all taxes)</span>
            </div>

            <p className="text-base font-medium mt-6">About Product</p>
            <ul className="list-disc ml-4 text-gray-500/70">
              {product.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>

            <div className="flex items-center mt-10 gap-4 text-base">
              <button
                onClick={() => dispatch(addToCart(product._id))}
                className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  dispatch(addToCart(product._id));
                  navigate("/cart");
                }}
                className="w-full py-3.5 cursor-pointer font-medium bg-[#4fbf8b] text-white hover:bg-[#44ae7c] transition"
              >
                Buy now
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="flex flex-col items-center mt-20">
          <div className="flex flex-col items-center w-max">
            <p className="text-3xl font-medium ">Related Products</p>
            <div className="w-20 h-0.5 bg-[#4fbf8b] rounded-full mt-2"></div>
          </div>
          <div className="flex flex-wrap mt-6 md:gap-6">
            {relatedProducts
              ?.filter((product) => product.inStock)
              .map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
          <button
            onClick={() => {
              navigate("/products");
              scrollTo(0, 0);
            }}
            className="mx-auto cursor-pointer px-12 my-16 py-2.5 border rounded text-[#4fbf8b] hover:bg-green-200 transition"
          >
            See More
          </button>
        </div>
      </div>
    )
  );
};
