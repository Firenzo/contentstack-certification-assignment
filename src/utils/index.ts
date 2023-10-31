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
