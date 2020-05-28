export interface Roles {
    Organiser?: boolean;
    Referee?: boolean;
}
export interface User {
    uid: string;
    name: string;
    email: string;
    emailVerified: boolean;
    roles:Roles;
}
