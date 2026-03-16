export class User {
   
    id: string|null;
    username: string | null;
    email: string;
    password: string | null;
    accountStatus: UserAccountStatus;
    emailVerificationStatus: UserEmailVerificationStatus;



    constructor(id: string|null , username: string | null = null, email: string, password: string | null = null, accountStatus: UserAccountStatus = UserAccountStatus.Temporary, emailVerificationStatus: UserEmailVerificationStatus = UserEmailVerificationStatus.Unverified) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.accountStatus = accountStatus;
        this.emailVerificationStatus = emailVerificationStatus;
    }
}


export enum UserAccountStatus
{   
    Temporary,
    Active,
    Suspended,
    Deleted
}

export enum UserEmailVerificationStatus
{
    Unverified,
    Verified
}