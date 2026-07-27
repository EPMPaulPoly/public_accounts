interface PasswordComplexityResult {
    length: boolean;
    uppercase: boolean;
    lowercase: boolean;
    digit: boolean;
    special: boolean;
}

export function isPasswordComplex(password: string, minLength: number = 8): boolean {
    const checks = checkPasswordComplexity(password, minLength);
    return Object.values(checks).every(Boolean);
}

export function checkPasswordComplexity(
    password: string,
    minLength: number = 8
): PasswordComplexityResult {
    return {
        length: password.length >= minLength,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        digit: /\d/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
}

export function getPasswordRequirements(password: string, minLength: number = 8): string[] {
    const issues: string[] = [];

    const result = checkPasswordComplexity(password, minLength);

    if (!result.length) {
        issues.push(`Minimum ${minLength} characters required`);
    }
    if (!result.uppercase) {
        issues.push('Include an uppercase letter');
    }
    if (!result.lowercase) {
        issues.push('Include a lowercase letter');
    }
    if (!result.digit) {
        issues.push('Include a number');
    }
    if (!result.special) {
        issues.push('Include a special character (!@#$%^&*)');
    }

    return issues;
}