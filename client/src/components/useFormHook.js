import { useState } from 'react';

export const useFormHook = formValues => {
    const [values, handleChange] = useState(formValues);

    return [values, e => {
        handleChange({
            ...values,
            [e.target.name]: e.target.value
        });
    }];
};