'use client'

import { DBTypes } from '(shared)'
import Icon from 'bs-icon'
import useFetch from 'http-react'
import Cookies from 'js-cookie'
import { useObject } from 'react-kuh'

export default function Login() {
  const [login, loginActions] = useObject({
    username: '',
    password: ''
  })

  const { error, reFetch: attemptLogin } = useFetch<{
    user: DBTypes.User
    auth_token: string
  }>('/user/login', {
    method: 'POST',
    body: login,
    auto: false,
    onResolve(data) {
      Cookies.set('auth_token', data.auth_token)
      location.reload()
    }
  })

  return (
    <div className='flex justify-center'>
      <form
        onSubmit={e => {
          e.preventDefault()
          attemptLogin()
        }}
        className='text-center space-y-4'
      >
        <h2 className='font-semibold'>Sign in with your credentials</h2>
        <div className='container space-y-4'>
          <div>
            <input
              value={login.username}
              placeholder='Username'
              type='text'
              className='input input-bordered'
              name='username'
              onChange={e =>
                loginActions.setPartialValue({
                  username: e.target.value
                })
              }
            />
          </div>
          <div>
            <input
              value={login.password}
              placeholder='Password'
              type='password'
              className='input input-bordered'
              name='password'
              onChange={e =>
                loginActions.setPartialValue({
                  password: e.target.value
                })
              }
            />
          </div>
          {error && (
            <p className='text-sm text-error'>
              <Icon name='exclamation-circle' /> Wrong username or password
            </p>
          )}
          <div>
            <button className='btn' type='submit'>
              Sign in
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
