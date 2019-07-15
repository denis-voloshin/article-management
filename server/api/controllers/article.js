import mongoose from 'mongoose';
import * as R from 'ramda';

import { ArticleModel } from '../models/article';
import { noImagePath, rootPath } from '../../utils/constants';
import { unlinkIfExist } from '../../utils/fs';

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
    const image = req.file && req.file.path;

    const article = new ArticleModel({
      _id: mongoose.Types.ObjectId(),
      title,
      text,
      isPublic,
      image: R.defaultTo(noImagePath, image)
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
    const image = req.file && req.file.path;

    const article = await ArticleModel.findById(articleId);

    if (!article) {
      unlinkIfExist(`${rootPath}/${image}`);

      return res.status(404).json({
        message: 'Article was not found'
      });
    }

    const updatedArticle = await ArticleModel.findOneAndUpdate({ _id: articleId }, {
      title,
      text,
      isPublic,
      image: R.defaultTo(noImagePath, image),
      updatedAt: Date.now()
    }, { 'new': true }).exec();

    res.status(200).json({
      message: 'Article was updated',
      article: updatedArticle
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
