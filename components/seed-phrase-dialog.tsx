'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { generateNewSeedPhrase, identityFromSeed } from '@/lib/seed-auth'

interface SeedPhraseDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit?: (phrase: string) => void
}

export function SeedPhraseDialog({
  isOpen,
  onClose,
  onSubmit
}: SeedPhraseDialogProps) {
  const [seedPhrase, setSeedPhrase] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setSeedPhrase('')
      setError('')
      setIsGenerating(false)
    }
  }, [isOpen])

  const handleGenerateNew = () => {
    const newPhrase = generateNewSeedPhrase()
    setSeedPhrase(newPhrase)
    setIsGenerating(true)
    setError('')
  }

  const handleConfirm = () => {
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

    try {
      // Generate and store the identity
      const identity = identityFromSeed(seedPhrase.trim())
      // Store the DER-encoded private key
      localStorage.setItem('identity_key', JSON.stringify(Array.from(new Uint8Array(identity.getKeyPair().secretKey))))

      if (isGenerating) {
        // If this was a new generation, store the seed phrase for recovery
        localStorage.setItem('seed_phrase', seedPhrase.trim())
      }

      onSubmit?.(seedPhrase.trim())
      onClose()
    } catch (err) {
      setError(`Invalid seed phrase format: ${err}`)
    }
  }

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSeedPhrase(e.target.value)
    setError('')
    setIsGenerating(false)
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 shadow-xl w-[90vw] max-w-md"
          aria-describedby="dialog-description"
        >
          <Dialog.Title className="text-xl font-semibold mb-4 text-gray-800">
            Seed Phrase Authentication
          </Dialog.Title>

          <div id="dialog-description" className="space-y-4">
            <div className="flex gap-4 mb-6">
              <Button
                onClick={handleGenerateNew}
                className="flex-1 bg-blue-500 text-white hover:bg-blue-600"
              >
                Generate New
              </Button>
              <Button
                onClick={() => {
                  setSeedPhrase('')
                  setIsGenerating(false)
                }}
                className="flex-1 bg-gray-400 text-white hover:bg-gray-600"
                disabled={!isGenerating}
              >
                Enter Existing
              </Button>
            </div>

            {isGenerating ? (
              <>
                <p className="text-gray-600">
                  This is your new seed phrase. Write it down and keep it safe. You&apos;ll need it to recover your account.
                </p>

                <div className="bg-gray-50 p-4 rounded break-all">
                  <p className="font-mono text-gray-800">{seedPhrase}</p>
                </div>

                <div className="bg-red-50 p-4 rounded border-2 border-red-500">
                  <p className="text-sm">
                    <span className="font-bold text-red-600">
                      ⚠️ WARNING! ⚠️ If you lose this seed phrase, you will <span className="underline">PERMANENTLY LOSE ACCESS</span> to your account and all associated funds. This is your <span className="underline">ONLY</span> recovery key. Write it down and keep it safe! 🔒
                    </span>
                  </p>
                </div>
              </>
            ) : (
              <p className="text-gray-600">
                Enter an existing seed phrase, same as in the CLI, to access your account.
              </p>
            )}

            {!isGenerating && (
              <textarea
                value={seedPhrase}
                onChange={handleInput}
                className="w-full h-32 p-4 border rounded font-mono text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                placeholder="Enter your 12 or 24 word seed phrase..."
              />
            )}

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            <Button
              onClick={handleConfirm}
              className="w-full bg-emerald-500 text-white hover:bg-emerald-600 h-11"
              disabled={!seedPhrase.trim()}
            >
              {isGenerating ? "I've Saved My Seed Phrase" : "Access Account"}
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
  )
}
