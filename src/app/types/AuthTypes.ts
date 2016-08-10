export interface AuthUser {
    /** The username that will be used for authentication. */
    username: string;
    /** The password that will be used for authentication. */
    password: string;
    /** Indicates if the login was made from PC web version. */
    isWeb: boolean;
    /** The unique device DNA to send to CA. */
    deviceDna: string;
}

export interface AuthResponse {
    /** An authentication token received from the server if the authentication was successful. */
    token: string;
    /** Indicates if the current device is trusted. */
    trusted: boolean;
    /** The display name of the current user. */
    fullName: string;
    /** The last login date. */
    lastLogin: Date;
    /** This property is specially used for failed login attempts. */
    success?: boolean;
}