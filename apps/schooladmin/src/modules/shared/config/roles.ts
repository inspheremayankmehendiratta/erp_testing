// roles.ts

export const ROLE = {
  SUPER_ADMIN: "NA",
  SCHOOL: "SA",
  // STAFF: "STAFF",
  // PARENT: "PARENT",
} as const;

export type Role = (typeof ROLE)[keyof typeof ROLE];
