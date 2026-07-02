export function omitField<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  field: K,
) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [field]: _, ...rest } = obj;
  return rest;
}
