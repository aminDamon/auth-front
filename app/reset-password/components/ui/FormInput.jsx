// components/ui/FormInput.jsx
import { motion } from 'framer-motion';

export const FormInput = ({
    id,
    name,
    type = 'text',
    placeholder,
    value,
    onChange,
    icon,
    label,
    required = false
}) => {
    return (
        <div className="group relative">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                {icon}
            </div>
            <input
                id={id}
                name={name}
                type={type}
                required={required}
                className="appearance-none relative block w-full px-3 py-3 pr-10 border-2 border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff6600]/30 focus:border-[#ff6600] sm:text-md transition-all duration-200"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            <label htmlFor={id} className="absolute -top-2 right-2 px-1 bg-white text-xs font-medium text-[#ff6600] opacity-0 group-focus-within:opacity-100 transition-opacity duration-200">
                {label}
            </label>
        </div>
    );
};