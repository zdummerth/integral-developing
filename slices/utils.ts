export const getColors = (settings: any, custom_background_color: string) => {
  const { background_color, text_color } = settings;
  const colors = {
    primary: settings.primary_color || "#000000",
    secondary: settings.secondary_color || "#000000",
    tertiary: settings.tertiary_color || "#000000",
    transparent: "transparent",
    white: "#ffffff",
    black: "#000000",
    gray: "#cccccc",
  };

  return {
    backgroundColor: background_color || "#ffffff",
    textColor: text_color || "#000000",
  };
};
export const getStyle = (settings: any) => {
  const { background_color, text_color } = settings;
  return {
    backgroundColor: background_color || "#ffffff",
    textColor: text_color || "#000000",
  };
};
export const getVariation = (variation: any) => {
  const { name, description, slice_type, id, ...variationRest } = variation;
  return variationRest;
};
export const getVariations = (variations: any) => {
  return variations.map(getVariation);
};
