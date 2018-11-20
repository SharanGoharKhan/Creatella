import React, { Component } from 'react'
import './ProductList.css'
import ProductItem from './ProductItem/ProductItem'

class ProductList extends Component {
    render() {
        const productItem = this.props.products.map((product)=>{
            return <ProductItem
                    key={product.id}
                    product={product}
                    />
        })
        return (
            <div className="ProductList">
                {productItem}
            </div>
        )
    }
}
export default ProductList