type ClassValue = false | null | undefined | string;

export function cn(...classes: ClassValue[]) {
  return classes.filter(Boolean).join(" ");
}
