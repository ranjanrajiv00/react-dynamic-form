import React from 'react';
import { Input } from 'reactstrap';

export default class Select extends React.Component {
    render() {
        let props = this.props;
        let options = this.props.options;
        let type = this.props.type;
        let value = this.props.value;

        const formElement = options.map((option) => {
            let checked = option.value === value;
            return (
                <option
                    key={option.key}
                    value={option.value}
                    checked={checked}>
                    {option.value}
                </option>
            );
        });

        return (
            <Input type={type} {...props}>{formElement}</Input>
        )
    }
}