import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  CheckBox
} from 'react-native';
/*
* @param item
* 待办事项各参数
* @param isEdit
* 是否编辑状态
* @param toggleItemCheck
* 待办事项checxbox选择事件
*/
export default class TodoListItem extends Component<Props> {
    constructor(props) {
        super(props);
    };

    render() {
        const {item, toggleItemCheck} = this.props;
        const {isChecked, text, level} = item;
        let levelStyle;
        switch (level) {
            case 'info': levelStyle = styles.info; break;
            case 'warning': levelStyle = styles.warning; break;
            case 'error': levelStyle = styles.danger; break;
            default: levelStyle = styles.info; break;
        }
        return(
            <View style={styles.container}>
                {this.props.isEdit && <CheckBox 
                    value={isChecked}
                    onValueChange={(value) => toggleItemCheck(item, value)}
                    style={styles.checkbox}/>}
                <Text style={styles.text}>{text}</Text>
                <View style={levelStyle}></View>
            </View>
        )
    };
}

const styles = StyleSheet.create({
    container: {
        height:50,
        flexDirection: 'row',
        alignItems: 'center'
    },
    checkbox: {
        marginLeft: 15
    },
    text: {
        flexGrow: 1,
        fontSize: 20,
        marginLeft: 15
    },
    info: {
        backgroundColor: '#409EFF',
        width: 20,
        height: 20,
        borderRadius: 50,
        marginRight: 15
    },
    warning: {
        backgroundColor: '#E6A23C',
        width: 20,
        height: 20,
        borderRadius: 50,
        marginRight: 15
    },
    danger: {
        backgroundColor: '#F56C6C',
        width: 20,
        height: 20,
        borderRadius: 50,
        marginRight: 15
    },
})
