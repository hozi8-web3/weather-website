import React, { useState } from 'react';

interface SearchBarProps {
    onSearch: (city: string) => void;
    onLocate: () => void;
    isLocating: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onLocate, isLocating }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim());
            setQuery('');
        }
    };

    return (
        <div className="flex items-center gap-2 w-full">
            <form onSubmit={handleSubmit} className="w-full relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for a city..."
                    className="w-full px-4 py-2.5 rounded-full bg-white/10 dark:bg-black/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-xl border border-white/20 shadow-lg"
                />
            </form>
            <button
                onClick={onLocate}
                disabled={isLocating}
                aria-label="Use my current location"
                title="Use my current location"
                className="p-2.5 rounded-full bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 shadow-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all hover:bg-white/20 disabled:opacity-50 disabled:cursor-wait flex-shrink-0"
            >
                {isLocating ? (
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                )}
            </button>
        </div>
    );
};

export default SearchBar;