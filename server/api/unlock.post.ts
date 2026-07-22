export default defineEventHandler(async (event) => {
  const { password } = await readBody<{ password?: string }>(event);
  const { pagePassword } = useRuntimeConfig(event);

  if (!pagePassword || password !== pagePassword) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Incorrect password',
    });
  }

  await setUserSession(
    event,
    {
      user: {
        pageAccess: true,
      },
    },
    {
      maxAge: 60 * 60 * 8,
    },
  );

  return { success: true };
});
