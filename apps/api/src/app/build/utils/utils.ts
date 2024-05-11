import { PrismaService } from "../../prisma/prisma.service";

export async function getPipelineResult(prisma: PrismaService, buildId: string) {
  const pipelineResult = await prisma.pipelineResult.findUnique({
    where: { buildId },
  });

  if (!pipelineResult) {
    throw new Error('PipelineResult not found');
  }
  
  return pipelineResult;
}
