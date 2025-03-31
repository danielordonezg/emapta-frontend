import DOMPurify from "dompurify";

export const sanitizeInput = (value: string): string => {
  return DOMPurify.sanitize(value);
};
