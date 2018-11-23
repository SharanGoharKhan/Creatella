import React, { Component } from 'react'
import { getProducts, getAllSortedProducts } from '../../utilities/products'
import ProductList from '../../components/ProductList/ProductList'
import Loader from '../../ui/Loader/Loader'

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
        this.idleTime = 10
        this.interval = null
    }
    handleSelectChanged = (title) => {
        this.setState({
            loading: true,
            products: []
        })
        getAllSortedProducts(title)
            .then(_products => {
                this.setState({
                    loading: false,
                    products: _products
                })
            })
            .catch(err => {
                this.setState({
                    loading: false
                })
                console.log(err)
            })
    }
    getMoreProducts(showLoadingSpinner = false) {
        if (showLoadingSpinner) {
            this.setState({
                loading: true
            })
        }
        this.setState(prevState => ({
            page: prevState.page + 1
        }))
        getProducts(this.state.page, this.state.limit)
            .then(_products => {
                if (_products.length === 0) {
                    clearInterval(this.interval)
                    this.setState(prevState => ({
                        isProductsFinished: !prevState.isProductsFinished,
                    }))
                }
                else
                    this.setState(prevState => ({
                        products: [...prevState.products, ..._products],
                    }))
                if (showLoadingSpinner) {
                    this.setState({
                        loading: false
                    })
                }
            })
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
            this.getMoreProducts()
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
                    if (this.state.products.length <= this.state.lastIndex) {
                        let showLoading = true
                        this.getMoreProducts(showLoading)
                    }
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
        let loading;
        if (this.state.bottom) {
            endOfProducts = <p>~ end of catalogue ~</p>
        }
        if (this.state.loading) {
            loading = <Loader />
        }
        productList = <ProductList
            selectChanged={this.handleSelectChanged}
            products={this.state.products}
            lastIndex={this.state.lastIndex} />

        return (
            <div ref='iScroll'
                style={{ height: '550px', overflow: 'auto' }}>
                {productList}
                <div style={{display: 'flex',justifyContent:'center'}}>
                    {loading}
                    {endOfProducts}
                </div>
            </div>
        )
    }
}
export default Product;