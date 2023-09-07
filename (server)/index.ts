import { SHA256 } from 'crypto-js'
import { sign, verify } from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import { Metadata } from 'next'
import { cookies, headers } from 'next/headers'
import { NextResponse } from 'next/server'

import { DBTypes } from '(shared)'

const { SECRET = 'secret' } = process.env

export function sha256(str: string) {
  return SHA256(str).toString()
}

export function verifyToken<T = any>(token: string): T {
  try {
    const isValid = verify(token, SECRET)
    return isValid as T
  } catch (err) {
    return null as T
  }
}

export async function getUser(req: Request) {
  const token = verifyToken<DBTypes.User>(
    req.headers.get('authorization') ?? ''
  )
  const user = await prisma.user.findFirst({
    where: {
      username: token?.username ?? ''
    }
  })

  if (user) {
    const userObject = {
      id: user.id,
      name: user.name,
      username: user.username,
      admin: user.admin
    }
    return userObject
  }

  return user
}

export function createToken(payload: any): string {
  let token: any
  try {
    token = sign(payload, SECRET, {
      expiresIn: '360 days'
    })
  } catch (err) {}
  return token as string
}

export function searchParams(req: Request) {
  return new URL(req.url).searchParams
}

export function $cookies() {
  return cookies()
}

export function $headers() {
  return headers()
}

export const httpError = (
  code: number,
  init?: {
    reason?: string
    headers?: any
    statusText?: string
    url?: string
  }
) => {
  const { reason, ...other } = (init || {}) as {
    reason?: string
    headers?: any
    statusText?: string
    url?: string
  }

  return NextResponse.json(
    {
      error: reason ?? code
    },
    { status: code, ...other }
  )
}

export function ignoreError<T>(callback: () => T | Promise<T>) {
  try {
    return callback()
  } catch (err) {
    return null as T
  }
}

export const Meta = (meta: Metadata) => meta

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
