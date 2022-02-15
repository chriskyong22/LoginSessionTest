
export const validateUsername = (username: string): boolean => {
    const USERNAME_REGEX = /^[A-Za-z0-9]{2,16}$/
    let validUsername = username.match(USERNAME_REGEX);
    console.log(`Username valid: ${validUsername}`);
    return validUsername !== null;
}

export const validatePassword = (password: string): boolean => {
    const PASSWORD_REGEX = /(?=^.{6,32}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
    /*
    (?=^.{8,32}$) - Positive Lookahead, see if the password is between 8-32 characters.
    (?=.*\d) - Positive Lookahead, see if any number of characters followed by number.
    (?=.*[!@#$%^&*]) - Positive Lookahead, see if any number of characters followed by one or more special characters
    (?![.\n]) - Negative Lookahead, see if . or \n before (I don't understand this.)
    (?=.*[A-Z]) - Positive Lookahead, see if any number of characters followed by A-Z
    (?=.*[a-z]) - Positive lookahead, see if any number of characters followed by a-z
    .*$ - any number of characters and then end of line
    */
    let validPassword = password.match(PASSWORD_REGEX);
    console.log(`Password valid: ${validPassword}`);
    return validPassword !== null;
}

export const validateEmail = (email: string): boolean => {
    return email !== "";
}