'use client'

import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'

export function AuthButtons() {
  const { isAuthenticated, principal, loginWithII, logout } = useAuth()

  if (isAuthenticated && principal) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="flex items-center gap-4"
      >
        <span className="text-sm text-white/80">
          Principal: {principal.toText().slice(0, 5)}...{principal.toText().slice(-5)}
        </span>
        <Button
          onClick={() => logout()}
          variant="outline"
          className="bg-white/10 text-white hover:bg-white/20"
        >
          Sign Out
        </Button>
      </motion.div>
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="flex gap-2"
      >
        <Button
          onClick={() => loginWithII()}
          variant="outline"
          className="bg-white/10 text-white hover:bg-white/20"
        >
          Login In
        </Button>
      </motion.div>
    </AnimatePresence>
  )
}