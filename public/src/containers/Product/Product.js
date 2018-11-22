import React, { Component } from 'react'
import getProducts from '../../utilities/products'
import ProductList from '../../components/ProductList/ProductList'

class Product extends Component {

    state = {
        page: 1,
        limit: 15,
        products: [],
        loading: true,
        lastIndex: 15,
        isProductsFinished: false,
        bottom: false
    }
    constructor(props) {
        super(props)
        this.lastActiveTime = new Date();
        this.idleTime = 1
        this.interval = null
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
    checkIdleTime = () => {
        let dateNowTime = new Date().getTime();
        let lastActiveTime = new Date(this.lastActiveTime).getTime();
        let remTime = Math.floor((dateNowTime - lastActiveTime) / 1000);
        if (remTime > this.idleTime) {
            this.setState(prevState => ({
                page: prevState.page + 1
            }))
            getProducts(this.state.page, this.state.limit)
                .then(_products => {
                    if (_products.length === 0) {
                        clearInterval(this.interval)
                        this.setState(prevState => ({
                            isProductsFinished: !prevState.isProductsFinished
                        }))
                    }
                    else
                        this.setState(prevState => ({
                            products: [...prevState.products, ..._products]
                        }))
                })
        }
    }
    componentDidMount() {
        this.listenToWindowEvents()
        this.interval = window.setInterval(this.checkIdleTime, this.idleTime * 1000);
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
        this.refs.iScroll.addEventListener('scroll', () => {
            if (
                this.refs.iScroll.scrollTop + this.refs.iScroll.clientHeight + 1 >=
                this.refs.iScroll.scrollHeight
            ) {
                if (!this.props.loading) {
                    this.setState(prevState => ({
                        lastIndex: prevState.lastIndex + 15
                    }))
                }
            }
            const bottom =
                this.refs.iScroll.scrollHeight - this.refs.iScroll.scrollTop ===
                this.refs.iScroll.clientHeight;
            if (bottom && !this.props.loading && this.state.isProductsFinished) {
                this.setState({ bottom: true });
            }
        })
    }
    render() {
        let productList;
        let endOfProducts;
        if(this.state.bottom) {
            endOfProducts = <p>End of Catalogue</p>
        }
        if (this.state.loading) {
            productList = <h3>Loading...</h3>
        } else {
            productList = <ProductList
                products={this.state.products}
                lastIndex={this.state.lastIndex} />
        }
        return (
            <div ref='iScroll'
            style={{height:'550px',overflow: "auto" }}>
                {productList}
                {endOfProducts}
            </div>
        )
    }
}
export default Product;