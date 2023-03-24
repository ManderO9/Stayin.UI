export class UserCreateModel {
    public Email: string | null = null;
    public Password: string | null = null;
    public Username:string|null = null;
    constructor(email: string | null, password: string | null, username:string|null) {
        this.Email = email;
        this.Password = password;
        this.Username = username;
    }
}
