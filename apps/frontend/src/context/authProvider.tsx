// src/components/AuthProvider.tsx
import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { authClient } from '../utils/auth-client'


interface AuthContextType {
    session: {
        token: string
        user: {
            id: string
            email: string
            name: string
            createdAt: Date
            updatedAt: Date
            emailVerified: boolean
            image?: string | null
            role?:'admin'|'user'
            username:string|null,
            displayUsername:string|null
        }
    } | null
    isLoading: boolean
    isAuthenticated: boolean
    login: (email: string, password: string) => Promise<{ data: any; error: any }>
    logout: () => Promise<void>
    isImpersonating:boolean
    stopImpersonating:()=>Promise<void>
    refreshSession:()=>Promise<void>
}

const AuthContext = createContext<AuthContextType>({} as any)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [session, setSession] = useState<any | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const fetchSession = useCallback(async () => {
        try {
            const { data } = await authClient.getSession()
            setSession(data)
        } catch (e) {
            setSession(null)
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchSession()
    }, [fetchSession])

    const login = useCallback(async (username: string, password: string) => {
        try {
            const result = await authClient.signIn.username({
                username,
                password
            })
            
            // Set session if successful
            if (result.data) {
                setSession({
                    token: result.data.token,
                    user: result.data.user
                })
            }
            
            // Return exactly what better-auth gave us
            return { 
                data: result.data,
                error: result.error 
            }
        } catch (err) {
            return { 
                data: null,
                error: err instanceof Error ? err : new Error('Unknown error')
            }
        }
    }, [])

    const logout = async () => {
        await authClient.signOut()
        setSession(null)
    }

    const isImpersonating = !!session?.session?.impersonatedBy        
    
    const stopImpersonating = async ()=>{
        const {data,error}= await authClient.admin.stopImpersonating()
        await refreshSession()
        if (error){
            alert('error when revoking impersonation')
        }
    }

    const refreshSession = useCallback(async () => {
        const { data } = await authClient.getSession()
        setSession(data)
    }, [])

    return (
        <AuthContext.Provider value={{ 
            session, 
            isLoading, 
            isAuthenticated: !!session,
            login, 
            logout,
            isImpersonating,
            stopImpersonating,
            refreshSession
        }}>
            {children}
        </AuthContext.Provider>
    )
}

// Hook to use anywhere
export function useAuth() {
    return useContext(AuthContext)
}