import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <button className={`px-4 py-2 rounded-lg active:bg-blue-400 transition-all ${bgColor} ${textColor} ${className}`} {...props}>
            {children}
        </button>
    );
}