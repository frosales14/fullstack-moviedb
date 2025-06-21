import { ChevronDown } from 'lucide-react';

interface PageSelectorProps {
    value: number;
    onChange: (value: number) => void;
    disabled?: boolean;
    options?: number[];
    label?: string;
}

export const PageSelector = ({
    value,
    onChange,
    disabled = false,
    options = [6, 12, 24, 48],
    label = "Items per page:"
}: PageSelectorProps) => {
    return (
        <div className="flex items-center space-x-2">
            <label htmlFor="itemsPerPage" className="text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="relative">
                <select
                    id="itemsPerPage"
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    disabled={disabled}
                    className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer hover:border-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {options.map(option => (
                        <option key={option} value={option}>
                            {option} per page
                        </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                    <ChevronDown className="w-4 h-4" />
                </div>
            </div>
        </div>
    );
};