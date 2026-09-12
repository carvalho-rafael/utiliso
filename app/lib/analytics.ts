export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-HJSBF7YRRL";

export const COOKIE_CONSENT_KEY = "cookie-consent";

export type CookieConsentValue = "accepted" | "rejected";

export const OPEN_COOKIE_SETTINGS_EVENT = "utiliso:open-cookie-settings";

export function grantAnalyticsConsent(sendPageView = false) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }
  window.gtag("consent", "update", {
    analytics_storage: "granted",
  });
  if (sendPageView) {
    window.gtag("event", "page_view", {
      page_location: window.location.href,
      page_title: document.title,
    });
  }
}

export function denyAnalyticsConsent() {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }
  window.gtag("consent", "update", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}
