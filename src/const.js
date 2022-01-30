
export function apiURL() {
    if (process.env.NODE_ENV !== 'production') { // For developing
        return "http://127.0.0.1:8000/api"
    }
    return "/api"
}
