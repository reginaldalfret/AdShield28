import React from 'react';

    interface UrlInputProps {
      value: string;
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    }

    const UrlInput: React.FC<UrlInputProps> = ({ value, onChange }) => (
      <input
        type="url"
        value={value}
        onChange={onChange}
        className="w-full bg-gray-800 text-white p-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter URL here..."
      />
    );

    export default UrlInput;
