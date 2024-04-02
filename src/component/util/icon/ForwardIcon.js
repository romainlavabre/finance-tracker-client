export default function ({size = 4}) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-${size} w-${size}`} fill="none" viewBox="0 0 24 24"
             stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z"/>
        </svg>
    );
}
