import { Router } from 'express'
import { prisma } from '../libs/prisma'
import { createUser, createUsers, deleteUser, getAllUsers, getUserByEmail, updateUser } from '../services/user'

export const mainRouter = Router()

mainRouter.get('/ping', (req, res) => {
    res.json({ pong: true })
})

mainRouter.post('/user', async (req, res) => {
    const user = await createUser({
        name: 'Ricardo',
        email: 'ricardo@hotmail.com',
        posts: {
            create: {
                title: 'Titulo de teste do Ricardo',
                body: 'Corpo do teste'
            }
        }
    })

    if (user) {
        res.status(201).json({ user })
    }
    else {
        res.status(500).json({
            error: 'Ocorreu um erro ao criar usuário'
        })
    }
})

mainRouter.post('/users', async (req, res) => {
    const result = await createUsers([])

    if (result) {
        res.status(201).json({ ok: result })
    }
    else {
        res.status(500).json({ error: 'Algo deu errado ao criar usuários' })
    }
})

mainRouter.get('/users', async (req, res) => {
    const result = await getAllUsers()

    res.status(200).json({ ok: result })
})

mainRouter.get('/user', async (req, res) => {
    const result = await getUserByEmail('felipesaadisiegert@gmail.com')

    res.status(200).json({ ok: result })
})

mainRouter.put('/user', async (req, res) => {
    const result = await updateUser({})
    res.status(200).json({ ok: result })
})

mainRouter.delete('/user', async (req, res) => {
    const result = await deleteUser(3)
    if (result) {
        res.json({ ok: result })
    }
    else {
        res.status(500).json({ error: 'Ocorreu um erro ao deletar o usuário' })
    }
})