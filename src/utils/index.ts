export const toPokemonNumber = (number: number) => {
  const numberLength = number.toString().length;
  if (numberLength === 1) {
    return `#00${number}`;
  }

  if (numberLength === 2) {
    return `#0${number}`;
  }

  if (numberLength > 2) {
    return `#${number}`;
  }
};

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
  return `${getSiteBaseURL()}${path}`;
};
