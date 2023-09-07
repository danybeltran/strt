'use client'
import Cookies from 'js-cookie'
import Icon from 'bs-icon'

export default function LogoutButton() {
  return (
    <button
      onClick={() => {
        Cookies.remove('auth_token')
        location.reload()
      }}
    >
      <Icon name='box-arrow-right' />
      Sign out
    </button>
  )
}
