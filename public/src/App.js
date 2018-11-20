import React, { Component } from "react";
import Header from "./components/Header/Header";
import Product from "./containers/Product/Product";

class App extends Component {


  render() {
    return (
      <div>
        <Header />
        <Product />
      </div>
    );
  }
}

export default App;
