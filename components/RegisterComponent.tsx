'use client'
import { validateEmail, validateName, validatePassword, validatePasswordConfirmation } from '@/utils/validate'
import { useEffect, useState } from 'react';
import InputField from './InputField';
import apiClient from '@/utils/APIClient';
import { ToastContainer, toast } from 'react-toastify';
//import { useRouter } from 'next/router';
import { useCurrentUser } from '@/app/hook/user';
import Utils from '@/utils/utils';

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

const RegisterComponent: React.FC = () => {
    const { user } = useCurrentUser();
    if (user) { Utils.redirectTo("/", 3000); }

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formFields, setFormFields] = useState<UserFields>(fields);
    const [errors, setErrors] = useState<ErrorState>({});
    const [touched, setTouched] = useState<TouchedFields>({
        name: false,
        email: false,
        password: false,
        passwordConfirmation: false
    });

    const handleInputChange = (fieldName: keyof UserFields) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { value } = event.target;
        setFormFields(prev => ({ ...prev, [fieldName]: value }));

        if (touched[fieldName]) {
            const error = fieldName === 'passwordConfirmation'
                ? validations[fieldName](value, formFields.password)
                : validations[fieldName](value);

            setErrors(prev => ({ ...prev, [fieldName]: error }));
        }
    };

    const handleBlur = (fieldName: keyof UserFields) => (
        event: React.FocusEvent<HTMLInputElement>
    ) => {
        setTouched(prev => ({ ...prev, [fieldName]: true }));
        const error = fieldName === 'passwordConfirmation'
            ? validations[fieldName](formFields[fieldName], formFields.password)
            : validations[fieldName](formFields[fieldName]);

        setErrors(prev => ({ ...prev, [fieldName]: error }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        let valid = true;
        let newErrors: ErrorState = {};

        // Validate all fields before submitting
        Object.keys(validations).forEach((key) => {
            const fieldKey = key as keyof UserFields;
            const error = fieldKey === 'passwordConfirmation'
                ? validations[fieldKey](formFields[fieldKey], formFields.password)
                : validations[fieldKey](formFields[fieldKey]);

            if (error) {
                newErrors[fieldKey] = error;
                valid = false;
            }
        });

        if (!valid) {
            setErrors(newErrors);
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await apiClient.registerUser(formFields);
            // 检查是否在客户端环境中
            toast.success('Successfully Registrited!', {
                position: toast.POSITION.TOP_CENTER,
                onClose: () => {
                    if (typeof window !== 'undefined') {
                        Utils.redirectTo("/", 6000);
                    }
                }
            });
        } catch (error) {
            console.error(error);
            const message = (error as any).response?.data?.message || 'An error occurred during registration.';
            toast.error(message);
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
                <button
                    disabled={isSubmitting}
                    className={`btn-sm text-sm text-white bg-indigo-500 hover:bg-indigo-600 w-full shadow-sm group 
              ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`} // change the appearance of the disabled button
                >
                    {isSubmitting ? 'Registering...' : 'Register'}
                    <span className="tracking-normal text-sky-300 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                        -&gt;
                    </span>
                </button>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </form>
    );
}


export default RegisterComponent;
