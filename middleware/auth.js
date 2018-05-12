export default context => {
  console.log("[Middleware] auth running...");

  if (!context.store.getters.isAuthenticated) {
    context.redirect("/login");
  }
};
