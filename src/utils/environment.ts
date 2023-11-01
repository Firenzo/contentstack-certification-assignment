export const Environment = {
  isDev: () => {
    return process.env.NODE_ENV === "dev";
  },

  isProd: () => {
    return process.env.NODE_ENV === "prd";
  },
};

export const getSiteBaseURL = (): string => {
  if (Environment.isProd()) {
    return `${process.env.HOST_URL}${process.env.SITE_PATH}`;
  }
  return "";
};

export const setRoute = (path: string): string => {
  if (path === "#") {
    return path;
  }
  return `${getSiteBaseURL()}${path}`;
};
