import React from 'react';
import { Input } from 'reactstrap';
import './Input.scss';

export default class InputBox extends React.Component {
    render() {
        let props = this.props;
        return (
            <Input {...props} />
        )
    }
}