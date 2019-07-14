export const ArticleController = {};

ArticleController.articleGetList = (req, res, next) => {
  res.status(200).json({
    message: 'Handling article get list...'
  });
};

ArticleController.articleCreate = (req, res, next) => {
  res.status(200).json({
    message: 'Handling article create...'
  });
};

ArticleController.articleGet = (req, res, next) => {
  res.status(200).json({
    message: 'Handling article get...'
  });
};

ArticleController.articleUpdate = (req, res, next) => {
  res.status(200).json({
    message: 'Handling article update...'
  });
};

ArticleController.articleDelete = (req, res, next) => {
  res.status(200).json({
    message: 'Handling article delete'
  });
};
