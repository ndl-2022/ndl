export interface User {
  username: string;
  role: UserRole;
}

export enum UserRole {
  Male = 'male',
  Female = 'female',
}
