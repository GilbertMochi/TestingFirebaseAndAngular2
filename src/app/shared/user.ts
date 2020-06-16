export interface Roles {
    organiser?: boolean;
    referee?: boolean;
}
export interface User {
    uid: string;
    email: string;
    emailVerified: boolean;
    roles:Roles;
}
