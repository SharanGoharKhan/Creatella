import React, { Component } from 'react'
import './Select.css'
class Select extends Component {

    state = {
        listOpen: false,
        headerTitle: this.props.title
    }
    handleClickOutside = () => {
        this.setState({
            listOpen: false
        })
    }
    toggleList = () => {
        this.setState(prevState => ({
            listOpen: !prevState.listOpen
        }))
    }
    itemSelect = (id,title) => {
        this.toggleList()
        this.props.toggleItem(id,title)
    }
    render() {
        let list_items
        if(this.state.listOpen) {
            list_items = this.props.list.map((item) => {
                return <li key={item.title}  
                onClick={()=> this.itemSelect(item.id,item.title)} 
                className="dd-list-item">{item.title}</li>
            })
        } else {
            list_items = null
        }
        return (
            <div className="dd-wrapper">
                <div className="dd-header" onClick={()=>this.toggleList()}>
                    <div className="dd-header-title">{this.state.headerTitle}</div>
                    {
                        this.state.listOpen
                        ? <span className="angle-down">^</span>
                        : <span className="angle-down">-</span>
                    }
                </div>
                {
                    this.state.listOpen
                    ?
                    <ul className="dd-list">
                        {list_items}
                    </ul>
                    :
                    null
                }
            </div>
        )
    }
}
export default Select