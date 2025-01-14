export class AuthorPassword {
    constructor(password) {
        this.value = password;
    }
    ensurePassword(password) {
        if (password.length < 8 || password.length > 20) {
            throw new Error('Password must be between 8 and 20 characters long');
        }
    }
    ensurePasswordComplexity(password) {
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(password)) {
            throw new Error('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character');
        }
    }
}
