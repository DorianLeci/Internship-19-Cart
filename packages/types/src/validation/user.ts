export const nameRegex=/^[a-zA-Z]+([ '-][a-zA-Z]+)*$/;
export const MIN_PASSWORD_LENGTH=8;
export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
export const MIN_EXPIRY_MONTH=1;
export const MAX_EXPIRTY_MONTH=12;
export const ibanRegex=/^[A-Z]{2}[A-Z\d]{11,30}$/;
export const CVC_LENGTH=3;
export const cvcRegex=/^\d+$/;