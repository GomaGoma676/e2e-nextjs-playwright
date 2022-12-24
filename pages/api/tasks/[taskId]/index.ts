import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '../../auth/[...nextauth]'
import {
  getTaskById,
  updateTask,
  deleteTask,
} from '../../../../lib/prisma/tasks'
import { updateTaskSchema, taskIdSchema } from '../../../../schema/task'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions)
  if (req.method === 'GET') {
    if (!session) {
      return res.status(401).json({
        error: 'You must sign in to access this endpoint',
      })
    }
    const validationRes = taskIdSchema.safeParse(req.query)
    if (!validationRes.success) {
      return res.status(400).send({
        message: 'Invalid input data',
      })
    }
    try {
      const { task, error } = await getTaskById(validationRes.data)
      if (error) throw new Error(error)
      return res.status(200).json(task)
    } catch (error: any) {
      return res.status(500).json({ error: error.message })
    }
  }
  if (req.method === 'DELETE') {
    if (!session) {
      return res.status(401).json({
        error: 'You must sign in to access this endpoint',
      })
    }
    const validationRes = taskIdSchema.safeParse(req.query)
    if (!validationRes.success) {
      return res.status(400).send({
        message: 'Invalid input data',
      })
    }
    try {
      const { task, error } = await deleteTask(validationRes.data)
      if (error) throw new Error(error)
      return res.status(200).json(task)
    } catch (error: any) {
      return res.status(500).json({ error: error.message })
    }
  }
  if (req.method === 'PUT') {
    if (!session) {
      return res.status(401).json({
        error: 'You must sign in to access this endpoint',
      })
    }
    const queryValidationRes = taskIdSchema.safeParse(req.query)
    const updateValidationRes = updateTaskSchema.safeParse(req.body)
    if (!queryValidationRes.success || !updateValidationRes.success) {
      return res.status(400).send({
        message: 'Invalid input data',
      })
    }
    try {
      const { task, error } = await updateTask(
        updateValidationRes.data,
        queryValidationRes.data
      )
      if (error) throw new Error(error)
      return res.status(200).json(task)
    } catch (error: any) {
      return res.status(500).json({ error: error.message })
    }
  }
  res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
  res.status(405).end(`Method ${req.method} is not allowed`)
}
export default handler
