export const stringRule = (val: unknown) =>
  (typeof val === "string" && val.length > 0) || "Campo requerido";
