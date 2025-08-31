import React, { useState } from "react";

interface InputFieldProps {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    placeholder?: string;
    helperText?: string;
    errorMessage?: string;
    disabled?: boolean;
    invalid?: boolean;
    loading?: boolean;
    variant?: "filled" | "outlined" | "ghost";
    size?: "sm" | "md" | "lg";
    type?: "text" | "password" | "email" | "number";
    showClearButton?: boolean;
    theme?: "light" | "dark";
}

export const InputField: React.FC<InputFieldProps> = ({
    value = "",
    onChange,
    label,
    placeholder,
    helperText,
    errorMessage,
    disabled = false,
    invalid = false,
    loading = false,
    variant = "outlined",
    size = "md",
    type = "text",
    showClearButton = false,
    theme = "light",
}) => {
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const handleClear = () => {
        if (onChange) {
            onChange({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>);
        }
    };
    

    const inputType = type === "password" ? (isPasswordVisible ? "text" : "password") : type;

    const baseClasses =
        "rounded-md border px-3 py-2 outline-none transition-colors duration-200 w-full";
    const sizeClasses = {
        sm: "text-sm py-1",
        md: "text-base py-2",
        lg: "text-lg py-3",
    };
    const variantClasses = {
        filled: "bg-gray-100 border-transparent focus:bg-white",
        outlined: "border-gray-300 focus:border-blue-500",
        ghost: "border-transparent bg-transparent focus:border-blue-500",
    };
    const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";
    const invalidClasses = invalid ? "border-red-500" : "";
    const themeClasses = theme === "dark" ? "bg-gray-700 text-white placeholder-gray-400" : "";

    return (
        <div className="flex flex-col w-full space-y-1">
            {label && <label className="font-medium">{label}</label>}
            <div className="relative flex items-center">
                <input
                    type={inputType}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled || loading}
                    className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${disabledClasses} ${invalidClasses} ${themeClasses}`}
                />
                {loading && (
                    <div className="absolute right-10">
                        <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
                {type === "password" && (
                    <button
                        type="button"
                        onClick={() => setPasswordVisible(!isPasswordVisible)}
                        className="absolute right-2 text-gray-500 hover:text-gray-700"
                    >
                        {isPasswordVisible ? "Hide" : "Show"}
                    </button>
                )}
                {showClearButton && value && !loading && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute right-2 text-gray-500 hover:text-gray-700"
                    >
                        ×
                    </button>
                )}
            </div>
            {invalid && errorMessage ? (
                <span className="text-red-500 text-sm">{errorMessage}</span>
            ) : (
                helperText && <span className="text-gray-500 text-sm">{helperText}</span>
            )}
        </div>
    );
};
