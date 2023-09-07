import { NextResponse } from 'next/server'

import { createToken, getUser, httpError, prisma, sha256 } from '(server)'

type ActionParams = {
  params: {
    action: 'login' | 'authenticate'
  }
}

export async function GET(req: Request, { params }: ActionParams) {
  const { action } = params

  if (action === 'authenticate') {
    const user = await getUser(req)

    if (!user) return httpError(403)

    return NextResponse.json(user)
  }

  return httpError(404)
}

export async function POST(req: Request, { params }: ActionParams) {
  const { action } = params

  if (action === 'login') {
    const { username, password } = await req.json()

    const foundUser = await prisma.user.findFirst({
      where: {
        AND: {
          username,
          password: sha256(password)
        }
      }
    })

    if (!foundUser) return httpError(401)

    const userObject = {
      id: foundUser.id,
      name: foundUser.name,
      username: foundUser.username,
      admin: foundUser.admin
    }

    return NextResponse.json({
      user: userObject,
      auth_token: createToken(userObject)
    })
  }

  return httpError(404)
}
