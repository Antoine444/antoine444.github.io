import React from 'react';

type BadgeVariant = 'default' | 'dark' | 'red' | 'green' | 'yellow' | 'indigo' | 'purple' | 'pink';

interface BadgeProps {
    variant?: BadgeVariant;
    children: React.ReactNode;
    className?: string;
}

const variantClasses = {
    default: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border border-blue-900",
    dark: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border border-gray-700",
    red: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 border border-red-900",
    green: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border border-green-900",
    yellow: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 border border-yellow-900",
    indigo: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300 border border-indigo-900",
    purple: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 border border-purple-900",
    pink: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300 border border-pink-900",
};

function Badge({
                   variant = 'default',
                   children,
                   className = '',
               }: BadgeProps) {
    const baseClasses = "text-xs font-medium me-2 px-2.5 py-0.5 rounded-full hover:scale-105 transition-transform duration-200 inline-block";
    const variantClass = variantClasses[variant] || variantClasses.default;

    return (
        <span className={`${baseClasses} ${variantClass} ${className}`}>
            {children}
        </span>
    );
}

export default Badge;
