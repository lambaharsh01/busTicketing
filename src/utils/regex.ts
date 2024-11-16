export const emailRegex: RegExp =/^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const phoneRegex: RegExp = /^[6-9]\d{9}$/
export const weakPasswordRegex: RegExp = /^(.{0,7}|([A-Za-z]+|\d+|[@$!%*?&]+))$/;
export const strongPasswordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&~])[A-Za-z\d@$!%*?&~]{8,}$/;
