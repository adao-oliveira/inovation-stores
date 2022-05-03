import React from "react";

const PaymentMethod = ({ value, text }) => {
    return (
        <div className="payments">
            <i
                className={
                    value >= 1
                        ? "PIX"
                        : value >= 1
                            ? "PIX"
                            : "PIX"
                }
            ></i>
            <i
                className={
                    value >= 2
                        ? "DINHEIRO"
                        : value >= 2
                            ? "DINHEIRO"
                            : "DINHEIRO"
                }
            ></i>
            <i
                className={
                    value >= 3
                        ? "PAYPAL"
                        : value >= 3
                            ? "PayPal ou Cartão de crédito/débito"
                            : "PayPal ou Cartão de crédito/débito"
                }
            ></i>

            <span>{text && text}</span>
        </div>
    );
};

export default PaymentMethod;
