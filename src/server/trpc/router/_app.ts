// src/server/router/_app.ts
import { router } from "../trpc";

import { articleRouter } from "./article";

export const appRouter = router({
  article: articleRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
