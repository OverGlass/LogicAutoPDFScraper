import {
  Application,
  send,
  Context,
} from "https://deno.land/x/oak@v6.1.0/mod.ts";

export default async function staticServ() {
  const app = new Application();
  const controller = new AbortController();
  const { signal } = controller;

  app.use(async (context: Context, next) => {
    await next();
    await send(context, context.request.url.pathname, {
      root: `${Deno.cwd()}/testServer`,
      index: `inde.html`,
    });
  });
  app.use(async (ctx: Context, next) => {
    controller.abort();
  });

  const listenPromoise = app.listen({ port: 8080, signal });

  await listenPromoise;
}
