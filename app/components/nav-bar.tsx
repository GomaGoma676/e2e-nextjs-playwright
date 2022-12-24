'use client'
import Image from 'next/image'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
import Spinner from './spinner'

export default function NavBar() {
  const { data: session, status } = useSession()
  const loading = status === 'loading'
  return (
    <header>
      <nav className="flex flex-wrap items-center bg-gray-800 p-3 font-bold text-white">
        <Link href="/" className="mr-4 inline-flex items-center p-2">
          Home
        </Link>
        <Link href="/fetch-cc" className="mr-4 inline-flex items-center p-2">
          CC_Fetch
        </Link>
        <Link href="/fetch-sc" className="mr-4 inline-flex items-center p-2">
          SC_Fetch
        </Link>
        <Link href="/task-crud" className="mr-4 inline-flex items-center p-2">
          CRUD
        </Link>
        {loading && <Spinner width="w-6" height="h-6" />}
        {session?.user ? (
          <>
            {session.user.image && (
              <span className="inline-block text-white">
                <Image
                  className="mx-2 rounded-full"
                  alt="avatar"
                  src={session.user.image}
                  width={25}
                  height={25}
                />
              </span>
            )}
            <span className="mx-2 font-normal">{session.user.name}</span>
            <button
              className="cursor-pointer font-normal text-indigo-500 hover:text-indigo-300"
              onClick={() => {
                signOut()
              }}
            >
              SignOut
            </button>
          </>
        ) : (
          <button
            className="cursor-pointer font-normal text-indigo-500 hover:text-indigo-300"
            onClick={() => signIn('github')}
          >
            SignIn GitHub
          </button>
        )}
      </nav>
    </header>
  )
}
