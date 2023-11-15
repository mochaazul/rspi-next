// import { createSlice, isAnyOf } from '@reduxjs/toolkit'; // migrate
import { ArticleState, ResponseStatus, ArticleDetail } from '@/interface';

import {
	getArticles,
	addArticle,
	updateArticle,
	deleteArticle,
	getArticleByID,
	getRelatedNewsByID,
	getNewsSpecialtyByID
} from './articlesThunk';

const initialState: ArticleState = {
	articles: [],
	selectedArticle: undefined,
	relatedNews: [],
	specialty: [],
	loading: false,
	error: {},
	pagination: null
};
// Migrate
// export const articleSlice = createSlice({
// 	name: 'articles',
// 	initialState,
// 	reducers: { example: () => initialState },
// 	extraReducers: builder => {
// 		builder.addCase(getArticles.fulfilled, (state, action) => {
// 			state.loading = false;
// 			state.articles = action.payload.data;
// 			state.pagination = action.payload.pagination;
// 		});
// 		builder.addCase(getArticleByID.fulfilled, (state, action) => {
// 			state.loading = false;
// 			state.selectedArticle = action.payload.data as ArticleDetail;
// 		});
// 		builder.addCase(getRelatedNewsByID.fulfilled, (state, action) => {
// 			state.loading = false;
// 			state.relatedNews = action.payload.data as ArticleDetail[];
// 		});
// 		builder.addCase(getNewsSpecialtyByID.fulfilled, (state, action) => {
// 			state.loading = false;
// 			state.specialty = action.payload.data as ArticleDetail[];
// 		});
// 		builder.addCase(addArticle.fulfilled, state => {
// 			state.loading = false;
// 		});
// 		builder.addCase(updateArticle.fulfilled, state => {
// 			state.loading = false;
// 		});
// 		builder.addMatcher(isAnyOf(updateArticle.rejected, getArticles.rejected, addArticle.rejected, deleteArticle.rejected), (state, action) => {
// 			state.loading = false;
// 			state.error = action.payload as ResponseStatus;
// 		});
// 		builder.addMatcher(isAnyOf(updateArticle.pending, getArticles.pending, addArticle.pending, deleteArticle.pending), state => {
// 			state.loading = true;
// 			state.error = initialState.error;
// 		});
// 	}
// });

export const articleSlice = () => {
	return '';
}

// export const { example } = articleSlice.actions; // migrate
export default articleSlice;
