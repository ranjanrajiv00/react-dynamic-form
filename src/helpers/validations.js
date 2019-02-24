export default {
    validateAvailableDate: function (e, args) {
        var date = new Date(e);
        var compareWith = new Date(args.from);
        return {
            isValid: date > compareWith,
            errors: {
                "date": `Please enter date after ${args.from}.`
            }
        };
    },
    validateField: function (value, rules) {
        let isValid = true;
        let errors = {};

        if ('required' in rules) {
            let isThisValid = value.trim() !== '';
            isValid = isThisValid && isValid;
            if (!isThisValid) {
                errors["required"] = 'Please fill out this field.';
            }
        }

        if ('minLength' in rules) {
            let isThisValid = value.length >= rules.minLength;
            isValid = isThisValid && isValid;
            if (!isThisValid) {
                errors["minLength"] = `Minimum ${rules.minLength} characters is required.`;
            }
        }

        if ('maxLength' in rules) {
            let isThisValid = value.length <= rules.maxLength;
            isValid = isThisValid && isValid;

            if (!isThisValid) {
                errors["maxLength"] = `Maximum ${rules.maxLength} characters is allowed.`;
            }
        }

        if ('email' in rules) {
            let patterns = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            let isThisValid = patterns.test(value);

            isValid = isThisValid && isValid;

            if (!isThisValid) {
                errors["email"] = `Please enter valid email.`;
            }
        }

        if ('pattern' in rules) {
            let patterns = rules.pattern;
            let isThisValid = patterns.test(value);

            isValid = isThisValid && isValid;

            if (!isThisValid) {
                errors["pattern"] = `Please enter in correct format.`;
            }
        }

        return {
            isValid: isValid,
            errors: errors
        };
    }
}