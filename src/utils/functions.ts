import { MAX_CHARACTER_DESCRIPTION_LENGTH } from "./constants";

export const getFormattedDate = (date: string) => {
  return new Date(date).toLocaleDateString("de-DE", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const getFormattedPrice = (price: string) => {
  const euro = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });
  return euro.format(+price);
};

export const getShortDescription = (description: string) => {
  return `${description.slice(0, MAX_CHARACTER_DESCRIPTION_LENGTH)}${
    description.length > MAX_CHARACTER_DESCRIPTION_LENGTH ? "..." : ""
  }`;
};
