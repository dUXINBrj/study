import React, { Component } from 'react';

export default class Repeat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: ['']
        };
    };

    handlerAddItem(e, index) {
        e.preventDefault();
        const items = [...this.state.items];
        items.splice(index, 0, '');
        this.setState({items});
        this.props.onChange(items);
    };

    handlerRemoveItem(e, index) {
        e.preventDefault();
        if (this.state.items.length === 1) return;
        const items = [...this.state.items];
        items.splice(index, 1);
        this.setState({items});
        this.props.onChange(items);
    };

    handleChange(e, index) {
        const items = [...this.state.items];
        items[index] = e.target.value;
        this.setState({items});
        this.props.onChange(items);
    };

    render() {
        const children = React.Children.only(this.props.children);
        const elementItems = this.state.items.map((item, index) => (
            <div key={index}>
                {
                    React.cloneElement(children, {
                        onChange: e => this.handleChange(e, index),
                        value: item,
                    })
                }
                <div>
                    <a onClick={e => this.handlerAddItem(e, index)}>添加</a>
                    <a onClick={e => this.handlerRemoveItem(e, index)}>移除</a>
                </div>
            </div>
        ));
        return <div>{elementItems}</div>;
    }
}