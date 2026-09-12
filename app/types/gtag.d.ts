type GtagConsentParams = {
  analytics_storage?: "granted" | "denied";
  ad_storage?: "granted" | "denied";
  ad_user_data?: "granted" | "denied";
  ad_personalization?: "granted" | "denied";
  wait_for_update?: number;
};

interface Window {
  dataLayer?: unknown[];
  gtag?: (
    command: "consent" | "js" | "config" | "event",
    targetOrAction: string | Date,
    params?: GtagConsentParams | Record<string, unknown>,
  ) => void;
}
