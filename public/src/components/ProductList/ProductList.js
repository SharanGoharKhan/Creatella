import React, { Component } from 'react'
import './ProductList.css'
import ProductItem from './ProductItem/ProductItem'
import Select from '../../ui/Select'

class ProductList extends Component {

    state = {
        filters: [
            {
                id: 0,
                title: 'size',
                selected: false,
                key: 'location'
            },
            {
                id: 1,
                title: 'price',
                selected: false,
                key: 'location'
            },
            {
                id: 2,
                title: 'id',
                selected: false,
                key: 'location'
            }
        ]
    }
    toggleSelected = (id,title) => {
        console.log(`toggleSelected id:  ${id} and key: ${title}`)
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