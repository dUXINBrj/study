import React, { Component } from 'react';

export default class UserForm extends Component {
    handleFieldChange(e) {
        const { name, value } = e.target;
        const formData = {
            ...this.props.value, 
            [name]: value,
        }
        console.log(formData);
        this.props.onChange({
            target: {
                value: formData,
            }
        });
    };
    render() {
        const name = this.props.value.name || '';
        const addr = this.props.value.addr || '';
        return (
            <div>
                <div>
                    <label>姓名</label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={e => this.handleFieldChange(e)}
                    />
                </div>
                <div>
                    <label>地址</label>
                    <input
                        type="text"
                        name="addr"
                        value={addr}
                        onChange={e => this.handleFieldChange(e)}
                    />
                </div>
            </div>
        )
    }
}