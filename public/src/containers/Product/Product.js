import React, { Component } from 'react'
import getProducts from '../../utilities/products'
import ProductList from '../../components/ProductList/ProductList'

class Product extends Component {

    state = {
        page: 1,
        limit: 15,
        products: [],
        loading: true
    }
    componentDidMount() {
        getProducts(this.state.page,this.state.limit)
        .then(_products => {
            this.setState({
                products: _products,
                loading: false
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }
    render() {
        let productList;
        if(this.state.loading) {
            productList = <h3>Loading...</h3>
        } else {
            productList = <ProductList/>
        }
        return (
            <div>
                {productList}
            </div>
        )
    }
}
export default Product;