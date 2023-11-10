export const initDev = () => {
  window.fbq('init', '606741228311470');
};

export const initStage = () => {
  window.fbq('init', '1295727161047406');
};

export const landingPageEvent = () => {
  window.fbq('track', 'landing page');
};

export const findDoctorEvent = () => {
  window.fbq('track', 'find a doctor page');
};

export const clinicPageEvent = () => {
  window.fbq('track', 'clinic page');
};

export const facilitiesPageEvent = () => {
  window.fbq('track', 'facilities page');
};

export const promoPageEvent = () => {
  window.fbq('track', 'promo page');
};

export const newsPageEvent = () => {
  window.fbq('track', 'news page');
};
