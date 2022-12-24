'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function MonitorSession() {
  const router = useRouter()
  const { data: session } = useSession()
  useEffect(() => {
    router.refresh()
  }, [session])
  return null
}
