import { createAuthClient } from "better-auth/react"
import { usernameClient, adminClient } from "better-auth/client/plugins"
     
const apiUrl = import.meta.env.VITE_BACKEND_URL||window.location.origin// otherwise just use the current window. the auth will append api/*
export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: apiUrl,
    plugins: [ 
        usernameClient() ,
        adminClient()
    ]
})