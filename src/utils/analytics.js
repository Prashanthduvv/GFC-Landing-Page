// src/utils/analytics.js
export const trackEvent = (category, action, label, value) => {
  // Store in localStorage for demo
  const events = JSON.parse(localStorage.getItem("gfc_analytics") || "[]");
  events.push({
    category,
    action,
    label,
    value,
    timestamp: new Date().toISOString(),
    url: window.location.href
  });
  localStorage.setItem("gfc_analytics", JSON.stringify(events.slice(-500)));
  
  // Console log for debugging
  console.log(`[Analytics] ${category}: ${action} - ${label}`);
  
  // Send to Google Analytics if available
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
  }
};

export const trackPageView = (page) => {
  trackEvent("Page View", "view", page);
};

export const trackCTA = (ctaName, location) => {
  trackEvent("CTA Click", ctaName, location);
};

export const trackPurchase = (amount, items) => {
  trackEvent("Purchase", "complete", `${items} items`, amount);
};