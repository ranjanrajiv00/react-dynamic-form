import React from 'react';

export default Error = (props) => {
    let { touched, submitted, isValid, errors } = props;

    const errorMessages = (touched || submitted) && !isValid && Object.keys(errors).map((errorKey, index) => {
        return (
            <em key={`error-${errorKey}-${index}`} className="error-message">{errors[errorKey]}</em>
        )
    });
    return (
        errorMessages || <em />
    )
}