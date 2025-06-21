'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';


interface SearchBarProps {
    onSearch: (searchTerm: string) => void;
    placeHolder: string;
}

export const SearchBar = ({ onSearch, placeHolder }: SearchBarProps) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    return (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
                type="text"
                value={searchTerm}
                onChange={handleChange}
                placeholder={placeHolder}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            />
        </div>
    );
}; 