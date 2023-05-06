// import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const animesRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.animes_anime.findMany({
      take: 10,
    });
  }),
});
