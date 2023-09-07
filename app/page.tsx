'use client'
import { useUser } from '(states)'

export default function HomePage() {
  const user = useUser()
  return (
    <main>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </main>
  )
}
