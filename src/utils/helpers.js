export const getTodayDate = () => new Date().toISOString().split('T')[0];
export const getMaxDate = () => {
  const max = new Date();
  max.setFullYear(max.getFullYear() + 2);
  return max.toISOString().split('T')[0];
};

export const LOGO_URL = "https://ik.imagekit.io/Selvamraj700/NammaTaste/WhatsApp%20Image%202026-04-18%20at%202.50.26%20PM.jpeg";
export const WEB3FORMS_ACCESS_KEY = 'f15f1eea-9b04-4f0d-a1a0-fbb99559baaa';

export const MARQUEE_MESSAGES = [
  "Fresh pani puri made daily", "Best momos in the city", "Refreshing mojitos for all",
  "Crispy French fries loaded", "Hygienic street food", "Fast delivery within 30 mins",
  "Affordable prices guaranteed", "Family friendly atmosphere", "Authentic Tamil Nadu taste",
  "Spicy and tangy flavors", "Cheese lovers paradise"
];
