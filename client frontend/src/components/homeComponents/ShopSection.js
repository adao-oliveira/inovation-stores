import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import Pagination from "./pagination";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../../Redux/Actions/ProductActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const ShopSection = (props) => {
  const { keyword, pagenumber } = props;
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProduct(keyword, pagenumber));
  }, [dispatch, keyword, pagenumber]);
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          {loading ? (
            <div className="mb-5">
              <Loading />
            </div>
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <>
              {products.map((product) => (
                <div
                  className="product-card"
                  key={product._id}
                >
                  <div class="logo-cart">
                    <i class='bx bx-shopping-bag'></i>
                  </div>
                  <Link to={`/products/${product._id}`}>
                    <div className="main-images">
                      <img src={product.image} alt={product.name} />
                    </div>
                  </Link>

                  <div className="shoe-details">
                    <span className="shoe_name">
                      {product.name}
                      <div class="stars">
                        <Rating
                          value={product.rating}
                          text={`  ${product.numReviews} Avaliações`}
                        />
                      </div>
                    </span>
                  </div>

                  <div class="color-price">
                    <div class="color-option">
                      <span class="color">Cor:</span>
                      <div class="circles">
                        <span class="circle blue active" id="blue"></span>
                        <span class="circle pink " id="pink"></span>
                        <span class="circle yellow " id="yellow"></span>
                      </div>
                    </div>
                    <div class="price">
                      <span class="price_num">R${product.price - product.discount}</span>
                      <span class="price_letter">R${product.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* Pagination */}
          <Pagination
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </div>
      </div>

    </>
  );
};

export default ShopSection;