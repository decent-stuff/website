'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { AuthClient } from '@dfinity/auth-client'
import { Identity } from '@dfinity/agent'
import { Principal } from '@dfinity/principal'

interface AuthContextType {
  isAuthenticated: boolean
  identity: Identity | null
  principal: Principal | null
  loginWithII: () => Promise<void>
  loginWithNFID: () => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  identity: null,
  principal: null,
  loginWithII: async () => {},
  loginWithNFID: async () => {},
  logout: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authClient, setAuthClient] = useState<AuthClient | null>(null)
  const [identity, setIdentity] = useState<Identity | null>(null)
  const [principal, setPrincipal] = useState<Principal | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    AuthClient.create().then(async (client) => {
      setAuthClient(client)
      const isAuthenticated = await client.isAuthenticated()
      if (isAuthenticated) {
        const identity = client.getIdentity()
        setIdentity(identity)
        setPrincipal(identity.getPrincipal())
      }
      setIsAuthenticated(isAuthenticated)
    })
  }, [])

  const loginWithII = async () => {
    if (!authClient) return

    await authClient.login({
      identityProvider: 'https://identity.ic0.app',
      onSuccess: () => {
        const identity = authClient.getIdentity()
        setIdentity(identity)
        setPrincipal(identity.getPrincipal())
        setIsAuthenticated(true)
      },
    })
  }

  const loginWithNFID = async () => {
    if (!authClient) return

    await authClient.login({
      identityProvider: 'https://nfid.one',
      onSuccess: () => {
        const identity = authClient.getIdentity()
        setIdentity(identity)
        setPrincipal(identity.getPrincipal())
        setIsAuthenticated(true)
      },
    })
  }

  const logout = async () => {
    if (!authClient) return

    await authClient.logout()
    setIsAuthenticated(false)
    setIdentity(null)
    setPrincipal(null)
  }

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        identity, 
        principal, 
        loginWithII, 
        loginWithNFID, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}