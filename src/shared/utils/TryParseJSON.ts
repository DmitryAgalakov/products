export const TryParseJSON = <T>(json: string | undefined | null) => {
  if (!json) return null;
  try {
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
};
