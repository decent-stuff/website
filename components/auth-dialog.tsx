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
      window.location.href = '/dashboard'
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
            className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-400 text-white font-medium hover:from-emerald-700 hover:to-emerald-500 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Sign In
          </Button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
          <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-4 sm:p-8 shadow-2xl w-[95vw] sm:w-[90vw] max-w-md border border-gray-100 animate-in fade-in-0 zoom-in-95 z-50">
           <Dialog.Title className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
             Welcome Back
           </Dialog.Title>

           <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
             Please choose your preferred authentication method to access your secure cloud storage.
           </p>

            <div className="flex flex-col gap-4 sm:gap-8">
              <div className="group space-y-2 sm:space-y-3 rounded-lg p-3 sm:p-4 transition-colors hover:bg-gray-50">
                <Button
                  onClick={handleSeedPhrase}
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-400 text-white hover:from-emerald-700 hover:to-emerald-500 h-14 sm:h-12 text-sm sm:text-base flex items-center justify-center gap-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                  Use a Seed Phrase (Mnemonic)
                </Button>
                <div className="space-y-1 px-1 sm:px-2">
                  <h3 className="font-medium text-gray-900 text-sm sm:text-base">BIP39 Mnemonic Phrase</h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Access your account using your seed phrase, a.k.a mnemonic or a recovery phrase. Credentials are securely encrypted and stored locally, and deleted when logging out.
                  </p>
                </div>
              </div>

              <div className="group space-y-2 sm:space-y-3 rounded-lg p-3 sm:p-4 transition-colors hover:bg-gray-50">
                <Button
                  onClick={handleInternetIdentity}
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-400 text-white hover:from-emerald-700 hover:to-emerald-500 h-14 sm:h-12 text-sm sm:text-base flex items-center justify-center gap-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Continue with Internet Identity
                </Button>
                <div className="space-y-1 px-1 sm:px-2">
                  <h3 className="font-medium text-gray-900 text-sm sm:text-base">Internet Identity</h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    The most secure way to access your account. Uses Internet Computer&apos;s authentication service with advanced security features. Your generated Principal will be different than from your seed phrase though.
                  </p>
                </div>
              </div>
            </div>

            <Dialog.Close asChild>
              <button
                className="absolute top-3 sm:top-4 right-3 sm:right-4 p-3 sm:p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200 group touch-manipulation"
                aria-label="Close dialog"
              >
                <svg
                  className="w-6 h-6 sm:w-5 sm:h-5 transform group-hover:rotate-90 transition-transform duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
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
