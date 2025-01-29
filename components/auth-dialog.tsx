'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { SeedPhraseDialog } from './seed-phrase-dialog'

export function AuthDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const { loginWithII, loginWithSeedPhrase, showSeedPhrase, setShowSeedPhrase } = useAuth()

  const handleInternetIdentity = async () => {
    setIsOpen(false)
    await loginWithII()
  }

  const handleSeedPhrase = () => {
    setIsOpen(false)
    setShowSeedPhrase(true)
  }

  const handleSeedPhraseSubmit = async (phrase: string) => {
    try {
      await loginWithSeedPhrase(phrase)
      window.location.hash = 'dashboard'
    } catch (error) {
      console.error('Login failed:', error)
      setShowSeedPhrase(true)
    }
  }

  const handleSeedPhraseDialogClose = () => {
    setShowSeedPhrase(false)
  }

  return (
    <>
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Trigger asChild>
          <Button
            className="px-6 py-2.5 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-colors"
          >
            Log In
          </Button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 shadow-xl w-[90vw] max-w-md">
            <Dialog.Title className="text-xl font-bold mb-4">
              Choose Login Method
            </Dialog.Title>

            <p className="text-gray-600 mb-6">
              Choose your preferred method to access your account securely.
            </p>

            <div className="flex flex-col gap-6">
              <div className="space-y-2">
                <Button
                  onClick={handleInternetIdentity}
                  className="w-full bg-emerald-500 text-white hover:bg-emerald-600 h-11 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Internet Identity
                </Button>
                <p className="text-sm text-gray-600 px-1">
                  Secure authentication using Internet Computer&apos;s identity service.
                </p>
              </div>

              <div className="space-y-2">
                <Button
                  onClick={handleSeedPhrase}
                  className="w-full bg-emerald-500 text-white hover:bg-emerald-600 h-11 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                  Seed Phrase
                </Button>
                <p className="text-sm text-gray-600 px-1">
                  Access your account using your backup seed phrase.
                </p>
              </div>
            </div>

            <Dialog.Close asChild>
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                aria-label="Close"
              >
                ✕
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <SeedPhraseDialog
        isOpen={showSeedPhrase}
        onClose={handleSeedPhraseDialogClose}
        onSubmit={handleSeedPhraseSubmit}
      />
    </>
  )
}
