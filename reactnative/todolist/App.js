/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  PixelRatio
} from 'react-native';
import TodoListAdd from './TodoListAdd';
import TodoListMain from './TodoListMain';

const {height,width} = Dimensions.get('window');
const Ratiotext = PixelRatio.get();

class Win extends Component {
  render() {
    return (
        <Text>
          {`width:${width},height:${height}`}          
        </Text>
    )
  }
};

class Ratio extends Component {
  render() {
    return (
      <Text>
        {`pxRatio:${Ratiotext}`}
      </Text>
    )
  }
};

export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'main',
      todoList: [
        {
          level: 'info',
          text: '一般的任务',
          isChecked: false,
          key: '0'
        },{
          level: 'info',
          text: '一般的任务2',
          isChecked: true,
          key: '1'
        },{
          level: 'warning',
          text: '重要的任务',
          isChecked: false,
          key: '2'
        },{
          level: 'error',
          text: '重要紧急的任务',
          isChecked: true,
          key: '3'
        },{
          level: 'error',
          text: '重要紧急的任务2',
          isChecked: false,
          key: '4'
        }
      ]
    };

    this.toggleItemCheck = this.toggleItemCheck.bind(this);
    this.toggleCheckAll = this.toggleCheckAll.bind(this);
    this.isCheckAll = this.isCheckAll.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onBack = this.onBack.bind(this);
  };

  onAdd(){
    this.setState({
      currentPage: 'add'
    });
  };

  onBack(){
    this.setState({
      currentPage: 'main'
    });
  };

  toggleItemCheck(item,newVal) {
    const newTodoList = this.state.todoList.map(todo => {
      if (todo != item) {
        return todo;
      }
      return {
        ...todo,
        isChecked: newVal
      }
    }); 
    this.setState({
      todoList:newTodoList
    })
  };

  isCheckAll() {
    if (!this.state.todoList) return false;
    if (this.state.todoList.length === 0) return false;
    return this.state.todoList.every(item => item.isChecked);
  };

  toggleCheckAll() {
    const flag = this.isCheckAll();
    const newTodoList = this.state.todoList.map(item => {
      return {
        ...item,
        isChecked: !flag
      }
    });
    this.setState({
      todoList:newTodoList
    });
  };

  render() {
    if (this.state.currentPage == 'main') {
      return (
        <TodoListMain 
          toggleItemCheck={this.toggleItemCheck}
          toggleCheckAll={this.toggleCheckAll}
          isCheckAll={this.isCheckAll}
          todoList={this.state.todoList}
          onAdd={this.onAdd}/>
      )
    } else {
      return (
        <TodoListAdd onBack={this.onBack}/>
      )
    }
  }
}
