export const debugLog = (...message) => {
  console.log("@@@@@@@@@@@@@@@@@@@@@@@@");
  message.forEach((m) => {
    console.log(m);
  });
  console.log("@@@@@@@@@@@@@@@@@@@@@@@@");
};
