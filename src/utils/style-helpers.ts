type hslString = string;

export const hexToHSL = (hex, valuesOnly = false) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  var r = parseInt(result[1], 16);
  var g = parseInt(result[2], 16);
  var b = parseInt(result[3], 16);
  var cssString = "";
  (r /= 255), (g /= 255), (b /= 255);
  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h,
    s,
    l = (max + min) / 2;
  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  cssString = h + "," + s + "%," + l + "%";
  cssString = !valuesOnly ? "hsl(" + cssString + ")" : cssString;

  return cssString;
};

export const getHSLValues = (hslString) => {
  const matches = hslString.match(/hsl\((\d+),(\d+)%\,(\d+)%\)/);

  if (matches) {
    const hue = parseInt(matches[1]);
    const saturation = parseInt(matches[2]);
    const lightness = parseInt(matches[3]);

    return {
      hue,
      saturation,
      lightness,
    };
  } else {
    return null; // Invalid HSL string
  }
};

export const defineHoverColor = (hslString: hslString) => {
  const hslValues = getHSLValues(hslString);
  const h = hslValues?.hue;
  const s = hslValues?.saturation;
  const l = hslValues?.lightness! < 3 ? 0 : hslValues?.lightness - 3;

  return `hsl(${h},${s}%,${l}%)`;
};

export const defineTextColor = (bgColor: hslString) => {
  const hslValues = getHSLValues(bgColor);
  return hslValues?.lightness! >= 70 ? "black" : "white";
};

export const defineTypeBgColor = (bgColor: hslString) => {
  const hslValues = getHSLValues(bgColor);
  return hslValues?.lightness! >= 70
    ? "rgba(0, 0, 0, 0.5)"
    : "rgba(255,255,255,0.8)";
};

export const increaseLightness = (bgColor: hslString) => {
  const hslValues = getHSLValues(bgColor);
  const h = hslValues?.hue;
  const s = hslValues?.saturation;
  const l = 90;
  return `hsl(${h},${s}%,${90}%)`;
};
