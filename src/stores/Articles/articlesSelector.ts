import { createSelector } from '@reduxjs/toolkit';
import { ArticleState } from '@/interface';

export const selectAllArticles = (state: ArticleState) => state.articles;

export const selectAllData = createSelector([selectAllArticles, (state, id) => id], articles => articles);