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
    trustedOrigins:[
        process.env.TRUSTED_FRONTEND||'http://localhost:5173'
    ],
    plugins:[
        admin(),
        username(),
    ]
});