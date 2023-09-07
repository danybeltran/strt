import 'bs-icon/icons.css'
import './globals.css'

import { AtomicState } from 'atomic-state'
import { FetchConfig } from 'http-react'
import { Inter } from 'next/font/google'

import { $cookies, Meta, verifyToken } from '(server)'
import Navigation from '(components)/Navigation'
import Login from '(components)/Login'

const InterFont = Inter({
  display: 'swap',
  weight: ['300', '400', '500', '600', '800', '900'],
  subsets: ['latin']
})

export const metadata = Meta({
  title: 'Starter project',
  viewport: {
    width: 'device-width',
    initialScale: 1
  }
})

export default function MainLayout({ children }) {
  const auth = $cookies().get('auth_token')?.value

  const user = verifyToken(auth as string)

  return (
    <html className='h-full' style={InterFont.style}>
      <body>
        <AtomicState
          atoms={{
            user: user
          }}
        >
          <FetchConfig
            baseUrl='/api'
            headers={{
              Authorization: auth as string
            }}
          >
            <Navigation user={user} />
            <div className='p-8 md:p-10'>{user ? children : <Login />}</div>
          </FetchConfig>
        </AtomicState>
      </body>
    </html>
  )
}
