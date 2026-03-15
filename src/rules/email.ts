import { isEmail } from "validator";

export const emailRule = (text: string) => isEmail(text) || "E-mail inválido";
