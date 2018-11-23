import React, { Component } from 'react'
import './ProductList.css'
import ProductItem from './ProductItem/ProductItem'
import Select from '../../ui/Select/Select'

class ProductList extends Component {

    state = {
        filters: [
            {
                id: 0,
                title: 'size'
            },
            {
                id: 1,
                title: 'price'
            },
            {
                id: 2,
                title: 'id'
            }
        ]
    }
    toggleSelected = (id,title) => {
        this.props.selectChanged(title)
    }
    render() {
        const productItem = this.props.products.map((product,index) => {
            if (index < this.props.lastIndex) {
                return <ProductItem
                key={product.id}
                product={product}
                index={index}
            /> 
            } else return null
        })
        return (
            <div>
                <div className="ProductSelect">
                    <Select 
                    title="Sort by"
                    list={this.state.filters} 
                    toggleItem={this.toggleSelected}/>
                </div>
                <div className="ProductList">
                    {productItem}
                </div>
            </div>
        )
    }
}
export default ProductList