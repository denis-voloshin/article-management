import withCss from '@zeit/next-css';

export default withCss({
  useFileSystemPublicRoutes: false,
  cssLoaderOptions: {
    url: false
  }
});
