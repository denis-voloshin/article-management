import nextRoutes from 'next-routes';

const routes = nextRoutes();

routes
  .add('home', '/', 'home');

export default routes;

export const Link = routes.Link;
export const Router = routes.Router;
