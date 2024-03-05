export const findYandexTrackIdInMessage = (message: string) =>
  message.split("track/")[1].replace(/\D/g, "");
