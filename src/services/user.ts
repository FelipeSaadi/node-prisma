import { Prisma } from "@prisma/client"
import { prisma } from "../libs/prisma"

export const createUser = async (data: Prisma.UserCreateInput) => {
  try {
    const user = await prisma.user.create({
      data
    })

    return user
  }
  catch (error) {
    return false
  }
}

export const createUsers = async (users: Prisma.UserCreateManyInput[]) => {
  try {
    const result = await prisma.user.createMany({
      data: [
        { name: 'João', email: 'joao@gmail.com' },
        { name: 'Fulano', email: 'fulano@gmail.com' },
        { name: 'Flávia', email: 'flavia@gmail.com' }
      ],
      skipDuplicates: true
    })
    return result
  }
  catch (error) {
    return false
  }
}

export const getAllUsers = async () => {
  const users = await prisma.user.findMany()
  return users
}

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true
    }
  })
  return user
}