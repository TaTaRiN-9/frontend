interface authProvider {
    isAuthenticated: boolean;
    username: null | string;
    singin(username: string): Promise<void>;
    singout(): Promise<void>;
} 

export default authProvider;
