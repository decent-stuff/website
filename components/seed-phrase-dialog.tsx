'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

interface SeedPhraseDialogProps {
  isOpen: boolean
  onClose: () => void
  mode?: 'create' | 'enter'
  onSubmit?: (phrase: string) => void
}

export function SeedPhraseDialog({
  isOpen,
  onClose,
  mode = 'create',
  onSubmit
}: SeedPhraseDialogProps) {
  const [seedPhrase, setSeedPhrase] = useState<string>('')
  const [hasCopied, setHasCopied] = useState(false)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    if (isOpen && mode === 'create') {
      const phrase = localStorage.getItem('seed_phrase')
      if (phrase) {
        setSeedPhrase(phrase)
      }
    } else {
      setSeedPhrase('')
      setError('')
    }
  }, [isOpen, mode])

  const handleCopy = () => {
    navigator.clipboard.writeText(seedPhrase)
    setHasCopied(true)
    setTimeout(() => setHasCopied(false), 2000)
  }

  const handleConfirm = () => {
    if (mode === 'enter') {
      if (!seedPhrase.trim()) {
        setError('Please enter your seed phrase')
        return
      }
      // Basic validation - check if it's a valid mnemonic (12 or 24 words)
      const wordCount = seedPhrase.trim().split(/\s+/).length
      if (wordCount !== 12 && wordCount !== 24) {
        setError('Invalid seed phrase. Must be 12 or 24 words')
        return
      }
      onSubmit?.(seedPhrase.trim())
    }
    onClose()
  }

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSeedPhrase(e.target.value)
    setError('')
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 shadow-xl w-[90vw] max-w-md"
          aria-describedby="dialog-description"
        >
          <Dialog.Title className="text-xl font-bold mb-4">
            {mode === 'create' ? 'Save Your Seed Phrase' : 'Enter Seed Phrase'}
          </Dialog.Title>

          <div id="dialog-description" className="space-y-4">
            {mode === 'create' ? (
              <>
                <p className="text-sm text-gray-600">
                  This is your seed phrase. Write it down and keep it safe. You&apos;ll need it to recover your account.
                </p>

                <div className="bg-gray-100 p-4 rounded-lg break-all">
                  <p className="text-sm font-mono">{seedPhrase}</p>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={handleCopy}
                    className="flex-1 bg-blue-500 text-white hover:bg-blue-600"
                  >
                    {hasCopied ? 'Copied!' : 'Copy to Clipboard'}
                  </Button>
                </div>

                <div className="mt-6">
                  <Button
                    onClick={handleConfirm}
                    className="w-full bg-green-500 text-white hover:bg-green-600"
                  >
                    I&apos;ve Saved My Seed Phrase
                  </Button>
                </div>

                <p className="mt-4 text-xs text-red-500">
                  Warning: If you lose this seed phrase, you will permanently lose access to your account.
                </p>
              </>
            ) : (
              <>
                <p className="text-sm text-gray-600">
                  Enter your seed phrase to access your account.
                </p>

                <textarea
                  value={seedPhrase}
                  onChange={handleInput}
                  className="w-full h-32 p-4 border rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your 12 or 24 word seed phrase..."
                />

                {error && (
                  <p className="text-sm text-red-500">{error}</p>
                )}

                <div className="mt-6">
                  <Button
                    onClick={handleConfirm}
                    className="w-full bg-green-500 text-white hover:bg-green-600"
                  >
                    Access Account
                  </Button>
                </div>
              </>
            )}
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
  )
}
