import React from 'react'
import './ProductItem.css'
import currencyFormatter from '../../../utilities/currencyFormatter'
import convertDateToRelative from '../../../utilities/dateConvertor'

const productItem = (props) => {
    return (
        <div className="ProductItem">
            {(props.index % 20 !== 0 || props.index === 0) ? (
                <div className="ProductItem--card">
                    <div className="ProductItem--card-title">
                        <h3 style={{ fontSize: props.product.size }}>{props.product.face}</h3>
                    </div>
                    <span className="ProductItem--card-size">
                        Size {props.product.size}
                    </span>
                    <span className="ProductItem--card-price">
                        {currencyFormatter.format(props.product.price)}
                    </span>
                    <p className="ProductItem--card-date">
                        Date: {convertDateToRelative(new Date(props.product.date))}
                    </p>
                </div>
            ) : (
                    <div className="ProductItem--image">
                        <p className="ProductItem--image-title">But first, a word from our sponsors:</p>
                        <img className="ProductItem--image-pic" src={"http://localhost:3000/ads/?r=1"} alt={"Ad"} />
                    </div>
                )}

        </div>
    )
}
export default productItem;