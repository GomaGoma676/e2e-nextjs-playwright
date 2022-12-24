import prisma from '.'

export async function getNotes() {
  try {
    const notes = await prisma.note.findMany()
    return { notes }
  } catch (error: any) {
    return { error }
  }
}
