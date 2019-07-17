import mongoose from 'mongoose';

import { noImagePath } from '../../utils/constants';

const articleSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  text: { type: String, required: true },
  isPublic: { type: Boolean, required: true },
  image: { type: String, 'default': noImagePath },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': null }
});

export const ArticleModel = mongoose.model('Article', articleSchema);
