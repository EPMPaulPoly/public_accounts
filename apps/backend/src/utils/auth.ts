import { betterAuth } from "better-auth";
import { db } from "../db/db";
import { admin, username } from "better-auth/plugins"
import 'dotenv'


export const auth = betterAuth({
    database: {
        db:db,
        type:'postgres'
    },
    emailAndPassword: { 
        enabled: true, 
    }, 
    password: {
      validate: async ({ password}:{password:string}) => {
        const checks = {
          length: password.length >= 8,
          uppercase: /[A-Z]/.test(password),
          lowercase: /[a-z]/.test(password),
          digit: /\d/.test(password),
          special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        };

        if (!checks.length) {
          throw new Error("Password must be at least 8 characters");
        }
        if (!checks.uppercase) {
          throw new Error("Password must contain an uppercase letter");
        }
        if (!checks.lowercase) {
          throw new Error("Password must contain a lowercase letter");
        }
        if (!checks.digit) {
          throw new Error("Password must contain a number");
        }
        if (!checks.special) {
          throw new Error("Password must contain a special character");
        }

        return password; // return the password to proceed with hashing
      },
    },
    user: {
      changeEmail: {
        enabled: true,
        updateEmailWithoutVerification: true // Update email without verification if user is not verified
      },
    },
    trustedOrigins:[
        process.env.TRUSTED_FRONTEND||'http://localhost:5173'
    ],
    plugins:[
        admin(),
        username(),
    ]
});