import React from 'react';

export default class RadioButton extends React.Component {
    render() {
        let props = this.props;
        let options = this.props.options;
        let type = this.props.type;

        const formElement = options.map((option) => {
            let checked = option.value === this.props.value;
            return (
                <React.Fragment key={'fr' + option.key}>
                    <input {...props}
                        type={type}
                        key={option.key}
                        name={option.name}
                        checked={checked}
                        value={option.value}
                    />
                    <label key={"ll" + option.key}>{option.label}</label>
                </React.Fragment>
            );
        });
        return (
            <div className="form-group-radio">{formElement}</div>
        )
    }
}