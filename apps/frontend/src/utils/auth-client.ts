import { createAuthClient } from "better-auth/react"
import { usernameClient, adminClient } from "better-auth/client/plugins"
     

export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: import.meta.env.VITE_BACKEND_URL||'http://localhost:5000',
    plugins: [ 
        usernameClient() ,
        adminClient()
    ]
})