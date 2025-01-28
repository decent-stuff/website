'use client'

import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

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
          <Link href="#dashboard" className="text-sm text-white hover:underline">
            Logged in: {principal.toText().slice(0, 5)}
          </Link>
        </span>
        <Link
          href="https://www.kongswap.io/swap?from=ryjl3-tyaaa-aaaaa-aaaba-cai&to=ggi4a-wyaaa-aaaai-actqq-cai"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            variant="outline"
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-blue-500 hover:to-purple-500"
          >
            Top Up DCT
          </Button>
        </Link>
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
            className="flex gap-4"
        >
          <Button
              onClick={() => loginWithII()}
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
        </motion.div>
      </AnimatePresence>
  )
}
