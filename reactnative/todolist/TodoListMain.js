import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  CheckBox,
  FlatList
} from 'react-native';
import TodoListItem from './TodoListItem';
/*
* @param todoList 
* 代办事项数据
* @param toggleItemCheck
* 待办事项checxbox选择事件
* @param toggleCheckAll
* 选择/取消 全部事件
* @param isCheckAll
* 选择全部checkbox绑定value
*/
export default class TodoListMain extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false
    };

    this.onEdit = this.onEdit.bind(this);
    this.renderItem = this.renderItem.bind(this);
  };

  onEdit() {
    this.setState((preState) => {
      return {
        isEdit: !preState.isEdit
      }
    })
  };

  renderItem(item) {
    return (
      <TodoListItem
        isEdit={this.state.isEdit}
        toggleItemCheck={this.props.toggleItemCheck}
        {...item}/>
    )
  };

  renderSeparator() {
    return (
      <View style={{height:2,backgroundColor:'#999'}}></View>
    )
  };

  renderListEmpty() {
    return (
      <Text style={{textAlign:'center'}}>暂无待办事项</Text>      
    )
  };

  renderFooter(isCheckAll, toggleCheckAll) {
    if (!this.state.isEdit) {
      return null;
    };
    const count = this.props.todoList.filter(item => item.isChecked).length;
    return (
      <View style={styles.footer}>
        <CheckBox value={isCheckAll()} onValueChange={toggleCheckAll}/>
        <Text>已选择{count}项</Text>    
      </View>
    )
  };

  render() {
    const {isCheckAll, toggleCheckAll, todoList} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.back} onPress={this.props.onAdd}>新增</Text>
          <Text style={styles.title}>待办事项</Text>
          <Text style={styles.close} onPress={this.onEdit}>{this.state.isEdit ? '取消' : '选择'}</Text>
        </View>
        <FlatList 
          style={styles.content} 
          data={todoList}
          isEdit={this.state.isEdit}
          ItemSeparatorComponent={this.renderSeparator}
          ListEmptyComponent={this.renderListEmpty}
          renderItem={this.renderItem}
        >
        </FlatList>
        {this.renderFooter(isCheckAll, toggleCheckAll)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  header: {
    height: 60,
    backgroundColor: '#3988FB',
    flexDirection: 'row',
    alignItems: 'center'
  },
  back: {
    color: '#efefef',
    fontSize: 16,
    marginLeft: 10
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
    color: "#fff",
    fontSize: 20
  },
  close: {
    color: '#efefef',
    fontSize: 16,
    marginRight: 10
  },
  content: {
    flexGrow: 2,
    backgroundColor: '#eceaea'
  },
  footer: {
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center'
  },
  menu: {
    flexGrow: 1,
    textAlign: 'center',
    color: '#efefef'
  },
  menuCenter: {
    flexGrow: 1,
    textAlign: 'center',
    color: '#efefef',
    borderLeftWidth: 1,
    borderLeftColor: '#efefef',
    borderRightWidth: 1,
    borderRightColor: '#efefef'
  }
});
