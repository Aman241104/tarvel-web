import { useCallback } from 'react';

const PHONE_NUMBER = "918511071506";

export function useWhatsApp() {
    const openWhatsApp = useCallback((context?: string, message?: string) => {
        const baseUrl = `https://wa.me/${PHONE_NUMBER}`;
        let finalMessage = "Hi Sujal, I want to plan a trip!";

        if (context) {
            finalMessage = `Hi Sujal, I'm interested in the ${context} section of your website. I want to plan a trip!`;
        }

        if (message) {
            finalMessage = message;
        }

        const encodedMessage = encodeURIComponent(finalMessage);
        window.open(`${baseUrl}?text=${encodedMessage}`, '_blank');
    }, []);

    return { openWhatsApp };
}
