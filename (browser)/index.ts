import { twMerge } from 'tailwind-merge'

import {
  useParams,
  usePathname,
  useSearchParams,
  useRouter
} from 'next/navigation'

export function useAppRouter() {
  const params = useParams()
  const query = Object.fromEntries(useSearchParams().entries())
  const pathname = usePathname()

  const $router = useRouter()

  return {
    pathname,
    params,
    query,
    ...$router
  }
}

export function clx(...args: any[]) {
  return twMerge(...args)
}
