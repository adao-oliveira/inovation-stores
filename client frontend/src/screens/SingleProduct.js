import React, { useEffect, useState } from "react";
import Header from "./../components/Header";
import Rating from "../components/homeComponents/Rating";
import { Link } from "react-router-dom";
import Message from "./../components/LoadingError/Error";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductReview,
  listProductDetails,
} from "../Redux/Actions/ProductActions";
import Loading from "../components/LoadingError/Loading";
import { PRODUCT_CREATE_REVIEW_RESET } from "../Redux/Constants/ProductConstants";
import moment from "moment";

const SingleProduct = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const productId = match.params.id;
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingCreateReview,
    error: errorCreateReview,
    success: successCreateReview,
  } = productReviewCreate;

  useEffect(() => {
    if (successCreateReview) {
      alert("Review Submitted");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(productId));
  }, [dispatch, productId, successCreateReview]);

  const AddToCartHandle = (e) => {
    e.preventDefault();
    history.push(`/cart/${productId}?qty=${qty}`);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(productId, {
        rating,
        comment,
      })
    );
  };
  return (
    <>
      <Header />
      <div className="container card-wrapper">
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            <div className="card">
              {/* card left */}
              <div className="product-imgs">
                <div class="img-display">
                  <div class="img-showcase">
                    <img src={product.image} alt={product.name} />
                    <img src={product.image_2} alt={product.name} />
                  </div>
                </div>
                <div class="img-select">
                  <div class="img-item">
                    <a href="#" data-id="1">
                      <img src={product.image} alt="" />
                    </a>
                  </div>
                  <div class="img-item">
                    <a href="#" data-id="2">
                      <img src={product.image_2} alt="" />
                    </a>
                  </div>
                </div>
              </div>

              {/* card right */}
              <div className="product-content">
                <h2 class="product-title">{product.name}</h2>
                <p>{product.description}</p>
                <div class="product-rating">
                  <Rating
                    value={product.rating}
                    text={`  ${product.numReviews} Avaliações`}
                  />
                </div>

                <div class="product-price">
                  <p class="last-price">De: <span>R${product.price}</span></p>
                  <p class="new-price">Por apenas: <span>R${product.price - product.discount}</span></p>
                </div>

                <div class="product-detail">
                  <h2>Descrição: </h2>
                  <p>{product.description}</p>
                  <div class="product-detail">
                  </div>

                  <div class="purchase-info">
                    <div className="product-count">
                      {product.countInStock > 0 ? (
                        <>
                          <div className="flex-box d-flex justify-content-between align-items-center">
                            <h6>Quantidade</h6>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>

                        </>
                      ) : null}
                    </div>
                    <button onClick={AddToCartHandle} className="btn mt-4">
                      Adicionar no carrinho <i class="fas fa-shopping-cart"></i>
                    </button>
                  </div>
                </div>


                <div className="row my-5">
                  {/* AVALIACOES */}
                  <div className="col-md-6">
                    <h6 className="mb-3">AVALIAÇÕES</h6>
                    {product.reviews.length === 0 && (
                      <Message variant={"alert-info mt-3"}>Sem avaliações</Message>
                    )}
                    {product.reviews.map((review) => (
                      <div
                        key={review._id}
                        className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded"
                      >
                        <strong>{review.name}</strong>
                        <div class="product-rating">
                          <Rating value={review.rating} />
                        </div>
                        <span>{moment(review.createdAt).format("DD/MM/YYYY")}</span>
                        <div className="alert alert-info mt-3">
                          {review.comment}
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* AVALIAR */}
                  <div className="col-md-6">
                    <h6>ESCREVA UMA AVALIAÇÃO</h6>
                    <div className="my-4">
                      {loadingCreateReview && <Loading />}
                      {errorCreateReview && (
                        <Message variant="alert-danger">
                          {errorCreateReview}
                        </Message>
                      )}
                    </div>
                    {userInfo ? (
                      <form onSubmit={submitHandler}>
                        <div className="my-4">
                          <strong>Avaliação</strong>
                          <select
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            className="col-12 bg-light p-3 mt-2 border-0 rounded"
                          >
                            <option value="">Selecione...</option>
                            <option value="1">1 - Péssimo</option>
                            <option value="2">2 - Ruim</option>
                            <option value="3">3 - Bom</option>
                            <option value="4">4 - Ótimo</option>
                            <option value="5">5 - Excelente</option>
                          </select>
                        </div>
                        <div className="my-4">
                          <strong>Comente</strong>
                          <textarea
                            row="3"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="col-12 bg-light p-3 mt-2 border-0 rounded"
                          ></textarea>
                        </div>
                        <div className="my-3">
                          <button
                            disabled={loadingCreateReview}
                            className="col-12 bg-black border-0 p-3 rounded text-white"
                          >
                            ENVIAR
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="my-3">
                        <Message variant={"alert-warning"}>
                          Por favor{" "}
                          <Link to="/login">
                            " <strong>Login</strong> "
                          </Link>{" "}
                          para avaliar{" "}
                        </Message>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>


          </>
        )}
      </div>
    </>
  );
};

export default SingleProduct;
