import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const animesRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.animes_anime.findMany({
      take: 30,
    });
  }),
  searchText: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.animes_anime.findMany({
      where: {
        title: {
          search: input ? `${input}:*` : "",
          mode: "insensitive",
        },
      },
      take: 20,
    });
  }),
});
