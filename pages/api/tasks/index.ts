import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth/next'
import { createTask, getTasks } from '../../../lib/prisma/tasks'
import { authOptions } from '../auth/[...nextauth]'
import { createTaskSchema } from '../../../schema/task'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions)
  if (req.method === 'GET') {
    if (!session) {
      return res.status(401).json({
        error: 'You must sign in to access this endpoint',
      })
    }
    try {
      const { tasks, error } = await getTasks(session.user!.id)
      if (error) throw new Error(error)
      return res.status(200).json(tasks)
    } catch (error: any) {
      return res.status(500).json({ error: error.message })
    }
  }
  if (req.method === 'POST') {
    if (!session) {
      return res.status(401).json({
        error: 'You must sign in to access this endpoint',
      })
    }
    const validationRes = createTaskSchema.safeParse(req.body)
    if (!validationRes.success) {
      return res.status(400).send({
        message: 'Invalid input data',
      })
    }
    try {
      const { task, error } = await createTask(
        validationRes.data,
        session.user!.id
      )
      if (error) throw new Error(error)
      return res.status(200).json(task)
    } catch (error: any) {
      return res.status(500).json({ error: error.message })
    }
  }
  res.setHeader('Allow', ['GET', 'POST'])
  res.status(405).end(`Method ${req.method} is not allowed`)
}
export default handler
