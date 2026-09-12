const GA_MEASUREMENT_ID = "G-5BFOWSQPC0";

export const trackEvent = (eventName, eventParams = {}) => {
    if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", eventName, eventParams);
    }
};

export const trackPageView = (pagePath) => {
    if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "page_view", {
            page_path: pagePath,
        });
    }
};