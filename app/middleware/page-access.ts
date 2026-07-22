export default defineNuxtRouteMiddleware(() => {
  const { user } = useUserSession();

  if (!user.value?.pageAccess) {
    return navigateTo("/store/unlock", { replace: true });
  }
});
