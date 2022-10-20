import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import newsApiClient from "../../integrations/news-api/news-api-client";
import dayjs from "dayjs";

export const articleRouter = router({
  getAll: publicProcedure.input(z.string()).query(async ({ input, ctx }) => {
    try {
      const oneHourAgo = dayjs().subtract(1, "hour");

      const latestData = await ctx.prisma.article.findFirst({
        where: { publishedAt: { gte: oneHourAgo.toISOString() } },
      });

      if (!latestData) {
        // get fresh data from news api
        const data = await newsApiClient.getLatestArticles({
          from: oneHourAgo,
        });

        if (data.length) {
          for (let { source, ...article } of data) {
            const newArticleData = {
              sourceId: source?.id || "",
              sourceName: source?.name || "",
              ...article,
            };

            // persist articles
            await ctx.prisma.article.upsert({
              create: newArticleData,
              update: newArticleData,
              where: { url: article.url },
            });
          }
        }
      }
    } catch (error) {
      console.log(error);
    }

    try {
      // return relevant data to client
      return ctx.prisma.article.findMany({
        orderBy: { publishedAt: "desc" },
        where: {
          OR: [
            {
              title: { contains: input, mode: "insensitive" },
            },
            {
              description: { contains: input, mode: "insensitive" },
            },
            {
              content: { contains: input, mode: "insensitive" },
            },
          ],
        },
      });
    } catch (error) {
      console.log(error);
    }
  }),
});
