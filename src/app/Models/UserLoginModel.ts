export class UserLoginModel {
    public Email: string | null = null;
    public Password: string | null = null;
    constructor(email: string | null, password: string | null) {
        this.Email = email;
        this.Password = password;
    }
}
