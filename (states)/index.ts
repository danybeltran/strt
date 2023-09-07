import { DBTypes } from '(shared)'
import { atom, useValue } from 'atomic-state'

const userState = atom<DBTypes.User>({
  name: 'user',
  default: {} as any
})

export const useUser = () => useValue(userState)
