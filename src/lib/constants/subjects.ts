export const supportedSubjects = ["Maths", "Science", "SST"] as const;

export type SupportedSubject = (typeof supportedSubjects)[number];
