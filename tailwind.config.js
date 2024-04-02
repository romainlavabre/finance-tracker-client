module.exports = {
    darkMode: "class",
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        screens: {
            'mobile': {"max": "640px"},
            'desktop': {min: "640px"},
            '13-15p': {max: "1024px"},
            '15.4-19p': {max: "1280px"},
            '20p': {min: "1600px"}
        },
        extend: {
            gridTemplateColumns: {
                '31': 'repeat(31, minmax(0, 1fr))',
            }
        }
    },
    plugins: [
        require('tw-elements/dist/plugin')
    ],
}
