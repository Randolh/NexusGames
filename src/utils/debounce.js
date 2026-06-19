// Limits the rate at which a function can fire
export function debounce(func, wait) {
    // Holds the current timer
    let timeout;
    
    return function executedFunction(...args) {
        // Function to execute after the wait time
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        
        // Cancel the previous timer if the function is called again
        clearTimeout(timeout);
        
        // Start a new timer
        timeout = setTimeout(later, wait);
    };
}
