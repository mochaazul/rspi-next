export const initDev = () => {
  fbq("init", "606741228311470");
};

export const initStage = () => {
  fbq("init", "1295727161047406");
};

export const landingPageEvent = () => {
  fbq("track", "landing page");
};

export const findDoctorEvent = () => {
  fbq("track", "find a doctor page");
};

export const clinicPageEvent = () => {
  fbq("track", "clinic page");
};

export const facilitiesPageEvent = () => {
  fbq("track", "facilities page");
};

export const promoPageEvent = () => {
  fbq("track", "promo page");
};

export const newsPageEvent = () => {
  fbq("track", "news page");
};
