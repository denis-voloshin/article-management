import mongoose from 'mongoose';

import { ArticleModel } from '../models/article';

export const ArticleController = {};

ArticleController.articleGetList = async (req, res, next) => {
  try {
    const articles = await ArticleModel.find().exec();

    res.status(200).json({ articles });
  } catch (err) {
    next(err);
  }
};

ArticleController.articleCreate = async (req, res, next) => {
  try {
    const { title, text, isPublic } = req.body;

    const article = new ArticleModel({
      _id: mongoose.Types.ObjectId(),
      title,
      text,
      isPublic
    });

    await article.save();

    res.status(201).json({
      message: 'Article was created',
      article
    });
  } catch (err) {
    next(err);
  }
};

ArticleController.articleGet = async (req, res, next) => {
  try {
    const { articleId } = req.params;

    const article = await ArticleModel.findById(articleId);

    if (!article) {
      return res.status(404).json({
        message: 'Article was not found'
      });
    }

    res.status(200).json({ article });
  } catch (err) {
    next(err);
  }
};

ArticleController.articleUpdate = async (req, res, next) => {
  try {
    const { articleId } = req.params;
    const { title, text, isPublic } = req.body;

    const article = await ArticleModel.findById(articleId);

    if (!article) {
      return res.status(404).json({
        message: 'Article was not found'
      });
    }

    await ArticleModel.updateOne({ _id: articleId }, {
      title,
      text,
      isPublic,
      updatedAt: Date.now()
    }).exec();

    res.status(200).json({
      message: 'Article was updated'
    });
  } catch (err) {
    next(err);
  }
};

ArticleController.articleDelete = async (req, res, next) => {
  try {
    const { articleId } = req.params;

    const article = await ArticleModel.findById(articleId);

    if (!article) {
      return res.status(404).json({
        message: 'Article was not found'
      });
    }

    await ArticleModel.deleteOne({ _id: articleId }).exec();

    res.status(200).json({
      message: 'Article was deleted'
    });
  } catch (err) {
    next(err);
  }
};
