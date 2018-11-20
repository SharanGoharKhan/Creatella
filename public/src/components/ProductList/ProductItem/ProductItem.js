import React from 'react'
import './ProductItem.css'
const productItem = (props) => {
    return (
        <div className="ProductItem">
            <div className="ProductItem--card">
                <div className="ProductItem--card-title">
                    <h3 style={{ fontSize: props.product.size }}>{props.product.face}</h3>
                </div>
                <span className="ProductItem--card-size">
                    Size {props.product.size}
                </span>
                <span className="ProductItem--card-price">
                    {props.product.price}
                </span>
                <p className="ProductItem--card-date">
                    Added On: {props.product.date}
                </p>
            </div>
        </div>
    )
}
export default productItem;