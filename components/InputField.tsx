import CheckMark from './CheckMark';

interface InputFieldProps {
  id: string;
  field: any;
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  touched: boolean;
  type: string;
  label: string;
  required?: boolean;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({ field, value, handleChange, handleBlur, touched, type, label, required, error }) => (
  <div>
    <label className="block text-sm text-slate-400 font-medium mb-1" htmlFor={`${field}`}>
      {label} {required && <span className="text-rose-500">*</span>}
    </label>
    <div className="relative">
      <input
        id={field}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`form-input text-sm py-2 w-full ${!touched ? 'border-gray-300' : (touched && error ? 'border-red-500' : 'border-green-500')}`}
        type={type}
        required={required}
      />
      {touched && !error && <CheckMark />}
      {error && <p className="text-red-500 text-xs pt-2">{error}</p>}
    </div>
  </div>
);

export default InputField;
