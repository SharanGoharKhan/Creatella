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
    constructor(props) {
        super(props)
        this.lastActiveTime = new Date();
        this.idleTime = 3
    }
    listenToWindowEvents = () => {
        window.onclick = () => {
            this.lastActiveTime = Date.now();
        };
        window.onmousemove = () => {
            this.lastActiveTime = Date.now();
        };
        window.onkeypress = () => {
            this.lastActiveTime = Date.now();
        };
        window.onscroll = () => {
            this.lastActiveTime = Date.now();
        };
    }
    CheckIdleTime = () => {
        let dateNowTime = new Date().getTime();
        let lastActiveTime = new Date(this.lastActiveTime).getTime();
        let remTime = Math.floor((dateNowTime - lastActiveTime) / 1000);
        if (remTime>this.idleTime) {
            this.setState(prevState => ({
              page: prevState.page + 1
            }))
            getProducts(this.state.page,this.state.limit)
            .then(_products => {
                this.setState(prevState => ({
                    products: [...prevState.products,..._products]
                }))
            })
        }
    }
    componentDidMount() {
        this.listenToWindowEvents()
        window.setInterval(this.CheckIdleTime, this.idleTime*1000);
        getProducts(this.state.page, this.state.limit)
            .then(_products => {
                this.setState({
                    products: _products,
                    loading: false
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
    render() {
        let productList;
        if (this.state.loading) {
            productList = <h3>Loading...</h3>
        } else {
            productList = <ProductList
                products={this.state.products} />
        }
        return (
            <div>
                {productList}
            </div>
        )
    }
}
export default Product;