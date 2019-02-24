import React from 'react';

export default class CheckBox extends React.Component {
    render() {
        let props = this.props;
        let options = this.props.options;
        let type = this.props.type;
        let value = this.props.value;

        const formElement = options.map((option) => {

            let checked = false;
            if (value && value.length > 0) {
                checked = value.indexOf(option.value) > -1 ? true : false;
            }
            return (
                <React.Fragment key={"cfr" + option.key}>
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
            <div className="form-group-checkbox">{formElement}</div>
        )
    }
}

