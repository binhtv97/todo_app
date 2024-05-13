export const REGEX_REQUIRED = /[a-zA-Z0-9-,]+/;
export const REGEX_DIGITS_ONLY = /^[0-9]*$/;
export const REGEX_MIN_MAX_PHONE = /^.{8,13}$/;
export const REGEX_MIN_PASSWORD = /^.{8,}$/;
export const REGEX_VALIDATION_EMAIL = /^\S+@\S+\.\S+$/;

export const REGEX_VALIDATION_PASSWORD =
  /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,}$/;

export type LocaleMessage = TranslateStr<TranslateRecord, TranslateKey>;
