import React from "react";

const Textarea = ({ label, placeholder, ...props }) => {
    return (
        <div className="w-full mb-4">
            {label && <label className="inline-block mb-1 pl-1">{label}</label>}
            <textarea
                className="w-full p-2 border rounded"
                placeholder={placeholder}
                {...props}
            />
        </div>
    );
};

export default Textarea;
