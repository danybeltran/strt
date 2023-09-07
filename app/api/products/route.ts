import { NextResponse } from 'next/server'

import { getUser, httpError, prisma, searchParams } from '(server)'

export async function GET(req: Request) {
  const user = await getUser(req)

  if (!user) return httpError(403)

  const search = Object.fromEntries(searchParams(req).entries())

  const { id, q } = search

  const products = id
    ? await prisma.product.findUnique({
        where: {
          id: id
        }
      })
    : await prisma.product.findMany({
        where: {
          name: {
            contains: q
          }
        }
      })

  if (!products) return httpError(404)

  return NextResponse.json(products)
}

export async function POST(req: Request) {
  const user = await getUser(req)

  if (!user) return httpError(403)

  if (!user.admin) return httpError(401)

  const { name = '', price = 0, stock = 0 } = await req.json()

  const newProduct = await prisma.product.create({
    data: {
      name,
      price,
      createdBy: user.username,
      lastUpdatedBy: user.username,
      stock
    }
  })

  return NextResponse.json(newProduct)
}

export async function DELETE(req: Request) {
  const user = await getUser(req)

  if (!user) return httpError(403)
  if (!user.admin) return httpError(401)

  const { id = 0 } = await req.json()

  const deletedProduct = await prisma.product.deleteMany({
    where: {
      id: {
        equals: id
      }
    }
  })

  return NextResponse.json(`Removed ${deletedProduct.count} products`)
}

export async function PUT(req: Request) {
  const user = await getUser(req)

  if (!user) return httpError(403)
  if (!user.admin) return httpError(401)

  const { name, price, stock, id = 0 } = await req.json()

  const deletedProduct = await prisma.product.updateMany({
    data: {
      name,
      price,
      stock,
      lastUpdatedBy: user.username
    },
    where: {
      id: {
        equals: id
      }
    }
  })

  return NextResponse.json(`Updated ${deletedProduct.count} products`)
}
