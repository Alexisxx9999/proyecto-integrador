 export interface User {
    id: number;
    email: string;
    password: string;
    name: string;
    lastname: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
    role: string;
    status: string;
    profile: string[] | null;
}