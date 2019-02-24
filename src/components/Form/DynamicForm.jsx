import React from 'react';
import { Button, Form, FormGroup, Label } from 'reactstrap';

import Input from './Elements/Input';
import Select from './Elements/Select';
import RadioButton from './Elements/RadioButton';
import CheckBox from './Elements/CheckBox';
import DateTime from './Elements/DateTime';
import Error from './Elements/Error';
import validator from '../../helpers/validations';

import helpers from '../../helpers/validations';

export default class DynamicForm extends React.Component {
    state = {
        defaultValues: {},
        schema: []
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.defaultValues && Object.keys(nextProps.defaultValues).length) {
            console.log('here1');

            return {
                defaultValues: nextProps.defaultValues,
                schema: nextProps.schema
            }
        } else {
            // Assign default values of "" to our controlled input

            let initialState = Object.keys(nextProps.schema).reduce((model, key) => {
                model[key] = prevState.defaultValues[key] || '';
                return model;
            }, {});
            return {
                defaultValues: initialState,
                schema: nextProps.schema
            }
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        let isValid = this.validate();
        if (isValid && this.props.onSubmit) {
            this.props.onSubmit(this.state.defaultValues);
        }
        else {
            console.log('Please enter all required field in preffered formate.')
        }
    }

    getValue(event) {
        if (event._isAMomentObject) {
            return event.format("MM/DD/YYYY");
        }
        else if (event.target) {
            return event.target.value;
        }
        else {
            return event;
        }
    }

    onChange = (e, key, type = "single") => {
        let updatedDefaultValues = { ...this.state.defaultValues };
        let updatedSchema = { ...this.state.schema };
        let element = updatedSchema[key];
        let value = this.getValue(e);

        // validate - required, maxlength, minlength
        let validated = validator.validateField(value, element.props);
        element.isValid = validated.isValid;
        element.errors = validated.errors;
        element.touched = true;

        let changedValue = {};
        if (type === "single") {
            changedValue = { [key]: value };
        } else {
            let found = this.state.defaultValues[key] ?
                this.state.defaultValues[key]
                    .find((item) => item === value) : false;

            if (found) {
                let data = this.state.defaultValues[key]
                    .filter((item) => {
                        return item !== found;
                    });

                changedValue = { [key]: data };
            } else {
                changedValue = { [key]: [value, ...updatedDefaultValues[key]] };
            }
        }

        this.setState({
            defaultValues: {
                ...updatedDefaultValues,
                ...changedValue
            },
            schema: { ...updatedSchema }
        });
    }

    validate() {
        let updatedDefaultValues = { ...this.state.defaultValues };
        let updatedSchema = { ...this.state.schema };
        let isFormValid = true;

        for (var key in updatedSchema) {
            let element = updatedSchema[key];
            let validated = validator.validateField(updatedDefaultValues[key], element.props);

            if (element.validations && Object.keys(element.validations).length > 0) {
                let functionName = Object.keys(element.validations)[0];
                if (typeof helpers[functionName] === 'function') {
                    let eventValidated = helpers[functionName](updatedDefaultValues[key], element.validations[functionName].args);

                    validated.isValid = eventValidated.isValid && validated.isValid;
                    validated.errors = { ...validated.errors, ...eventValidated.errors }
                }
            }

            element.isValid = validated.isValid;
            element.errors = validated.errors;
            element.submitted = true;
            isFormValid = element.isValid && isFormValid;
        }

        this.setState({
            schema: { ...updatedSchema }
        });
        return isFormValid;
    }

    errorClass(element) {
        return (element.touched || element.submitted) && !element.isValid ? 'error-input' : ''
    }

    dynamicEventsBinding(element) {
        let events = {};
        if (element.validations && Object.keys(element.validations).length > 0) {
            let functionName = Object.keys(element.validations)[0];
            if (typeof helpers[functionName] === 'function') {
                events[`onBlur`] = (e) => {
                    let value = this.getValue(e);
                    let validated = helpers[functionName](value, element.validations[functionName].args);
                    let updatedSchema = { ...this.state.schema };

                    updatedSchema[element.key].isValid = validated.isValid;
                    updatedSchema[element.key].errors = validated.errors;
                    updatedSchema[element.key].touched = true;

                    this.setState({
                        schema: { ...updatedSchema }
                    });
                }
            }
        }

        return events;
    }

    renderForm = () => {
        let schema = this.state.schema;

        let formElements = Object.keys(schema).map((key) => {
            let element = schema[key];
            let type = element.type || "text";
            let props = element.props || {};
            let value = element.value;
            let formElement = null;

            value = this.state.defaultValues[key];

            // event binding
            let events = this.dynamicEventsBinding(element);

            switch (type) {
                case "select":
                    formElement = <Select options={element.options}
                        {...props}
                        key={key}
                        type={type}
                        value={value}
                        onChange={(e) => { this.onChange(e, element.key) }} />;
                    break;
                case "radio":
                    formElement = <RadioButton options={element.options}
                        {...props}
                        key={key}
                        type={type}
                        value={value}
                        onChange={(e) => { this.onChange(e, element.key) }} />;
                    break;
                case "checkbox":
                    formElement = <CheckBox options={element.options}
                        {...props}
                        key={key}
                        type={type}
                        value={value}
                        onChange={(e) => { this.onChange(e, element.key, "multiple") }} />;
                    break;
                case "datetime":
                    formElement = <DateTime {...props}
                        type={type}
                        key={key}
                        value={value}
                        {...events}
                        onChange={(e) => { this.onChange(e, key) }} />;
                    break;
                default:
                    formElement = <Input {...props}
                        type={type}
                        key={key}
                        value={value}
                        className={this.errorClass(element)}
                        onChange={(e) => { this.onChange(e, key) }}
                    />;
            }

            return (
                <FormGroup key={`group-${key}`}>
                    <Label key={`label-${key}`}>{element.label}</Label>
                    {formElement}
                    <Error
                        touched={element.touched}
                        submitted={element.submitted}
                        isValid={element.isValid}
                        errors={element.errors}
                    />
                </FormGroup>
            );
        });
        return formElements;
    }

    render() {
        return (
            <Form onSubmit={(e) => { this.onSubmit(e) }} noValidate>
                {this.renderForm()}
                <Button type="submit">submit</Button>
            </Form>
        )
    }
}