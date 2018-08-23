import React, { Component } from 'react';
import Repeat from './Repeat';
import UserForm from './UserForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      demo1: [],
      demo2: [],
    }
  };

  handleChange(key, items) {
    this.setState({
      ...this.state,
      [key]: items,
    })
  };

  render() {
    return (
      <div>
        <Repeat onChange={items => this.handleChange('demo1', items)}>
            <input type="text"/>
        </Repeat>
        <div>Result: {JSON.stringify(this.state.demo1)}</div>
        <hr/>
        <Repeat onChange={items => this.handleChange('demo2', items)}>
            <UserForm />
        </Repeat>
        <div>Result: {JSON.stringify(this.state.demo2)}</div>
    </div>
    );
  }
}

export default App;
