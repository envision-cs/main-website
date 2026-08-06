import { PostHog } from "posthog-node";

export default defineNitroPlugin((nitroApp) => {
  if (import.meta.dev) return;

  const config = useRuntimeConfig();
  const posthog = new PostHog(config.public.posthog.publicKey, {
    host: "https://us.i.posthog.com",
    flushAt: 1,
    flushInterval: 0,
  });

  nitroApp.hooks.hook("error", async (error, { event }) => {
    const status = (error as { statusCode?: number }).statusCode ?? 500;
    if (status < 500) return;

    posthog.captureException(error, undefined, {
      path: event?.path,
      method: event?.method,
    });

    await posthog.flush();
  });
});
