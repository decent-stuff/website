'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { AuthClient } from '@dfinity/auth-client'
import { Identity } from '@dfinity/agent'
import { Principal } from '@dfinity/principal'
import { generateNewSeedPhrase, identityFromSeed } from './seed-auth'

interface AuthContextType {
  isAuthenticated: boolean
  identity: Identity | null
  principal: Principal | null
  loginWithII: () => Promise<void>
  loginWithNFID: () => Promise<void>
  loginWithSeedPhrase: (seedPhrase?: string) => Promise<void>
  logout: () => Promise<void>
  showSeedPhrase: boolean
  setShowSeedPhrase: (show: boolean) => void
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  identity: null,
  principal: null,
  loginWithII: async () => {},
  loginWithNFID: async () => {},
  loginWithSeedPhrase: async () => {},
  logout: async () => {},
  showSeedPhrase: false,
  setShowSeedPhrase: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authClient, setAuthClient] = useState<AuthClient | null>(null)
  const [identity, setIdentity] = useState<Identity | null>(null)
  const [principal, setPrincipal] = useState<Principal | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showSeedPhrase, setShowSeedPhrase] = useState(false)

  useEffect(() => {
    void AuthClient.create().then(async (client) => {
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
        window.location.hash = 'dashboard'
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
        window.location.hash = 'dashboard'
      },
    })
  }

  const loginWithSeedPhrase = async (existingSeedPhrase?: string) => {
    try {
      let seedPhrase: string

      if (existingSeedPhrase) {
        // Use existing seed phrase
        seedPhrase = existingSeedPhrase
      } else {
        // Generate new seed phrase
        seedPhrase = generateNewSeedPhrase()
        // Store the new seed phrase securely
        localStorage.setItem('seed_phrase', seedPhrase)
        setShowSeedPhrase(true)
      }

      const identity = identityFromSeed(seedPhrase)
      setIdentity(identity)
      setPrincipal(identity.getPrincipal())
      setIsAuthenticated(true)
    } catch (error) {
      console.error('Failed to login with seed phrase:', error)
      throw error // Re-throw to handle in UI
    }
  }

  const logout = async () => {
    if (!authClient) return

    await authClient.logout()
    setIsAuthenticated(false)
    setIdentity(null)
    setPrincipal(null)
    localStorage.removeItem('seed_phrase')
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        identity,
        principal,
        loginWithII,
        loginWithNFID,
        loginWithSeedPhrase,
        logout,
        showSeedPhrase,
        setShowSeedPhrase
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
