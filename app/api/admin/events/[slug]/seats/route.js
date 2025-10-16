import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req, { params }) {
  const { slug } = params

  const event = await prisma.event.findUnique({
    where: { slug },
    include: {
      tables: {
        include: { seats: true },
        orderBy: { number: 'asc' },
      },
    },
  })

  if (!event) 
    return NextResponse.json({ error: 'Event not found' }, { status: 404 })

  return NextResponse.json({ event })
}
