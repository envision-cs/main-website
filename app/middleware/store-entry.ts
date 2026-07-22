export default defineNuxtRouteMiddleware(() => {
  const { user } = useUserSession();

  return navigateTo(user.value?.pageAccess ? "/store/shop" : "/store/unlock", {
    replace: true,
  });
});
