'use client'

import { registerUser } from '@/app/api/user/user';
import { validateEmail, validateName, validatePassword, validatePasswordConfirmation } from '@/utils/validate'

import { useState } from 'react';
import InputField from './InputField';

type UserFields = {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}

type TouchedFields = {
    [key in keyof UserFields]: boolean;
}

type ValidationFunctions = {
    [key in keyof UserFields]: (value: string, confirmValue?: string) => string | null;
}

type ErrorState = {
    [key in keyof UserFields]?: string | null;
}

const fields: UserFields = {
    name: '',
    email: '',
    password: '',
    passwordConfirmation: ''
};

const validations: ValidationFunctions = {
    name: validateName,
    email: validateEmail,
    password: validatePassword,
    passwordConfirmation: validatePasswordConfirmation,
};

const RegisterComponent = () => {
    const [formFields, setFormFields] = useState<UserFields>(fields);
    const [errors, setErrors] = useState<ErrorState>({});
    const [touched, setTouched] = useState<TouchedFields>({ // New state
        name: false,
        email: false,
        password: false,
        passwordConfirmation: false
    });
    const [successMessage, setSuccessMessage] = useState('');

    const handleInputChange = (fieldName: keyof UserFields) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { value } = event.target;
        setFormFields(prev => ({ ...prev, [fieldName]: value }));
        if (touched[fieldName]) { // Only validate if field has been touched
            const error = fieldName === 'passwordConfirmation'
                ? validations[fieldName](formFields.password, value)
                : validations[fieldName](value);
            setErrors(prev => ({ ...prev, [fieldName]: error }));
        }
    };

    const handleBlur = (fieldName: keyof UserFields) => (
        event: React.FocusEvent<HTMLInputElement>
    ) => {
        setTouched(prev => ({ ...prev, [fieldName]: true }));
        const error = fieldName === 'passwordConfirmation'
            ? validations[fieldName](formFields.password, formFields[fieldName])
            : validations[fieldName](formFields[fieldName]);
        setErrors(prev => ({ ...prev, [fieldName]: error }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        let valid = true;
        let formErrors: ErrorState = {};
    
        Object.keys(validations).forEach((key) => {
            const fieldError = key === 'passwordConfirmation'
              ? validations[key as keyof UserFields](formFields.password, formFields[key as keyof UserFields])
              : validations[key as keyof UserFields](formFields[key as keyof UserFields]);
            if (fieldError) {
                formErrors[key as keyof UserFields] = fieldError;
                valid = false;
            }
        });
    
        if (!valid) {
            setErrors(formErrors);
            return;
        }
    
        try {
            await registerUser(formFields);
            setSuccessMessage('User registration successful!');
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };
    


    return (
        <form onSubmit={handleSubmit}>
            <InputField
                id="name"
                field="name"
                value={formFields.name}
                handleChange={handleInputChange('name')}
                handleBlur={handleBlur('name')}
                touched={touched.name}
                type="text"
                label="Name"
                required
                error={touched.name && errors.name ? errors.name : undefined}
            />
            <InputField
                id="email"
                field="email"
                value={formFields.email}
                handleChange={handleInputChange('email')}
                handleBlur={handleBlur('email')}
                touched={touched.email}
                type="email"
                label="Email"
                required
                error={touched.email && errors.email ? errors.email : undefined}
            />
            <InputField
                id="password"
                field="password"
                value={formFields.password}
                handleChange={handleInputChange('password')}
                handleBlur={handleBlur('password')}
                touched={touched.password}
                type="password"
                label="Password"
                required
                error={touched.password && errors.password ? errors.password : undefined}
            />
            <InputField
                id="passwordConfirmation"
                field="passwordConfirmation"
                value={formFields.passwordConfirmation}
                handleChange={handleInputChange('passwordConfirmation')}
                handleBlur={handleBlur('passwordConfirmation')}
                touched={touched.passwordConfirmation}
                type="password"
                label="Confirm Password"
                required
                error={touched.passwordConfirmation && errors.passwordConfirmation ? errors.passwordConfirmation : undefined}
            />
            <div className="mt-6">
                <button className="btn-sm text-sm text-white bg-indigo-500 hover:bg-indigo-600 w-full shadow-sm group">
                    Request Demo{' '}
                    <span className="tracking-normal text-sky-300 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                        -&gt;
                    </span>
                </button>
            </div>
            {successMessage && <p>{successMessage}</p>}
        </form>
    );
}


export default RegisterComponent;
