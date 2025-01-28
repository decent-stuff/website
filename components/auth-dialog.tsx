'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { SeedPhraseDialog } from './seed-phrase-dialog'

export function AuthDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [seedDialogMode, setSeedDialogMode] = useState<'create' | 'enter'>('create')
  const { loginWithII, loginWithSeedPhrase, showSeedPhrase, setShowSeedPhrase } = useAuth()

  const handleInternetIdentity = async () => {
    setIsOpen(false)
    await loginWithII()
  }

  const handleSeedPhrase = () => {
    setIsOpen(false)
    setSeedDialogMode('enter')
    // Small delay to ensure mode is set before showing dialog
    setTimeout(() => setShowSeedPhrase(true), 0)
  }

  const handleSeedPhraseSubmit = async (phrase: string) => {
    try {
      await loginWithSeedPhrase(phrase)
      window.location.hash = 'dashboard'
    } catch (error) {
      console.error('Login failed:', error)
      // Keep dialog open to show error
      setShowSeedPhrase(true)
    }
  }

  const handleSeedPhraseDialogClose = () => {
    setShowSeedPhrase(false)
    // Reset mode after dialog is closed
    setTimeout(() => setSeedDialogMode('create'), 100)
  }

  return (
    <>
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Trigger asChild>
          <Button
            variant="outline"
            className="relative px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-lg shadow-lg
              hover:from-purple-600 hover:to-blue-500 hover:scale-105 hover:text-white transition-all duration-300 ease-in-out"
          >
            <span className="relative z-10 flex items-center gap-2">
              Log In
            </span>
            <span
              className="absolute inset-0 bg-white/20 rounded-full scale-0 transition-transform duration-300 group-hover:scale-100"
            ></span>
          </Button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 shadow-xl w-[90vw] max-w-md">
            <Dialog.Title className="text-xl font-bold mb-4">
              Choose Login Method
            </Dialog.Title>

            <div className="flex flex-col gap-4">
              <Button
                onClick={handleInternetIdentity}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-purple-600 hover:to-blue-500"
              >
                Internet Identity
              </Button>

              <Button
                onClick={handleSeedPhrase}
                className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white hover:from-teal-600 hover:to-green-500"
              >
                Seed Phrase
              </Button>
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
        mode={seedDialogMode}
        onSubmit={handleSeedPhraseSubmit}
      />
    </>
  )
}
