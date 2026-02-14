import {createCallerFactory, createTRPCRouter} from "@/server/api/trpc"; 
import { newtonBinomialRouter } from "./router/newton-binomial"; // Import standard
export const appRouter = createTRPCRouter({ 
    newtonBinomial: newtonBinomialRouter
});  

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);