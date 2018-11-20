import React, { Component } from 'react'
import './ProductList.css'
import ProductItem from './ProductItem/ProductItem'
import Select from '../../ui/Select'

class ProductList extends Component {

    state = {
        filters: [
            {
                title: 'size',
                selected: false,
                key: 'location'
            },
            {
                title: 'price',
                selected: false,
                key: 'location'
            },
            {
                title: 'id',
                selected: false,
                key: 'location'
            }
        ]
    }
    render() {
        const productItem = this.props.products.map((product) => {
            return <ProductItem
                key={product.id}
                product={product}
            />
        })
        return (
            <div>
                <div className="ProductSelect">
                    <Select 
                    title="Sort by"
                    list={this.state.filters} />
                </div>
                <div className="ProductList">
                    {productItem}
                </div>
            </div>
        )
    }
}
export default ProductList