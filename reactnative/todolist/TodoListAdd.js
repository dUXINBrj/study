import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button
} from 'react-native';

export default class TodoListAdd extends Component<Props> {
    constructor(props) {
        super(props);
    };

    onPress() {};

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.back} onPress={this.props.onBack}>返回</Text>
                </View>
                <View style={styles.content}>
                    <TextInput />
                </View>
                <View style={styles.footer}>
                    <View style={styles.btn}>
                        <Button title="确定" onPress={this.onPress}></Button>
                    </View>
                </View>
            </View>
        )
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        height: 60,
        backgroundColor: '#3988FB',
        alignItems: 'center',
        flexDirection: 'row'
    },
    back: {
        marginLeft: 10,
        color: '#efefef',
        fontSize: 16        
    },
    content: {
        flex: 1
    },
    footer: {
        height: 60,
        borderTopWidth: 1,
        borderTopColor: '#999',
        alignItems: 'center',
        flexDirection: 'row'
    },
    btn: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10
    }
});