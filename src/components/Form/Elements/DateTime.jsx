import React from 'react';
import DatePicker from 'react-datetime';
import './DateTime.scss';

export default class DateTime extends React.Component {
    render() {
        let props = this.props;

        return (
            <DatePicker {...props} closeOnSelect={true} />
        )
    }
}