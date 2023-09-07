import Link from 'next/link'
import Icon from 'bs-icon'

import { DBTypes } from '(shared)'

import LogoutButton from './LogoutButton'

export default function Navigation({ user }: { user: DBTypes.User }) {
  return user ? (
    <div className='navbar bg-base-100 shadow'>
      <div className='flex-1'>
        <Link href='/' className='btn btn-ghost normal-case text-xl'>
          App
        </Link>
      </div>
      <div className='flex-none'>
        <ul className='menu menu-horizontal px-1'>
          <li>
            <Link href='/version'>Productos</Link>
          </li>
          <li>
            <Link href='/version'>Ventas</Link>
          </li>
        </ul>
        <div className='dropdown dropdown-end'>
          <label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
            <div className='w-10 rounded-full'>
              <img src='/user-logo.png' />
            </div>
          </label>
          <ul
            tabIndex={0}
            className='mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52'
          >
            <li>
              <Link href='/'>
                <Icon name='person' />
                Profile
              </Link>
            </li>
            <li>
              <Link href='/'>
                <Icon name='gear' />
                Settings
              </Link>
            </li>
            <li>
              <LogoutButton />
            </li>
          </ul>
        </div>
      </div>
    </div>
  ) : null
}
