'use client';

/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

import { ArticleState, Pagination, PayloadArticle } from '@/interface';
import { useAppDispatch, useTypedSelector } from '@/hooks';

import {
	createFieldConfig, maxLengthRule, minLengthRule, navigation, requiredRule
} from '@/helpers';

import { getArticles, addArticle as addArticleAction, updateArticle as updateArticleAction, deleteArticle as deleteArticleAction } from '@/stores/actions';

enum ModalType {
	INIT,
	ADD,
	UPDATE,
}

type QueryParams = {
	tempOffset?: number,
	tempLimit?: number;
};

export const addArticleField = {
	title: {
		...createFieldConfig({
			name: 'title',
			type: 'text'
		}),
		validationRules: [
			requiredRule('title'),
			minLengthRule('title', 10),
			maxLengthRule('title', 25)
		]
	},
	content: {
		...createFieldConfig({
			name: 'content',
			type: 'text'
		}),
		validationRules: [
			requiredRule('content'),
			minLengthRule('content', 8),
			maxLengthRule('content', 20)
		]
	}
};

const useDashboard = () => {
	const { articles, loading: loadingArticle } = useTypedSelector<ArticleState>('articles');
	const { navigate } = navigation();

	const [offset, setOffset] = useState(0);
	const [limit, setLimit] = useState(20);
	const [modalVisible, setModalVisible] = useState<ModalType>(ModalType.INIT);
	const [idArticle, setIdArticle] = useState(0);

	const fetchArticle = useAppDispatch<Pagination>(getArticles);
	const addArticle = useAppDispatch<PayloadArticle>(addArticleAction);
	const updateArticle = useAppDispatch<PayloadArticle>(updateArticleAction);
	const deleteArticle = useAppDispatch<PayloadArticle>(deleteArticleAction);

	useEffect(() => {
		fetchArticle({
			payload: {
				page: offset,
				limit
			}
		});
	}, [offset, limit]);

	const onChangeLimit = (e?: React.ChangeEvent<HTMLSelectElement>) => {
		if (e) {
			const tempLimit = Number(e.target.value);
			setLimit(tempLimit);
			handleNavigate({ tempLimit });
		}
	};

	const onClickPagination = (type: string) => {
		const tempOffset = type === 'next' ? Number(offset) + Number(limit) : Number(offset) - Number(limit);
		setOffset(tempOffset > 0 ? tempOffset : 0);
		handleNavigate({ tempOffset });

	};

	const handleNavigate = ({ tempOffset = offset, tempLimit = limit }: QueryParams) => {
		navigate({
			pathname: location.pathname,
			search: `?page=${ tempOffset > 0 ? tempOffset : 0 }&limit=${ tempLimit }`

		});
	};

	const onOk = (title: string, content: string) => {
		const payload = {
			title: title,
			content: content,
			meta_description: 'Interior',
			created_by: 'superadmin',
			tags: [1],
			new_tags: [1],
			thumbnail_img: 'gambar-rumah.jpg',
			is_publish: true
		};
		modalVisible === ModalType.ADD ?
			addArticle({ payload: { ...payload } }) :
			updateArticle({
				payload: { ...payload },
				id: idArticle
			});
		setModalVisible(ModalType.INIT);
	};

	const onDeleteArticle = (id: number) => {
		deleteArticle({ id });
	};

	return {
		articles,
		limit,
		loadingArticle,
		onChangeLimit,
		onClickPagination,
		modalVisible,
		setModalVisible,
		onOk,
		modalType: ModalType,
		onDeleteArticle,
		addArticleField,
		setIdArticle
	};
};

export default useDashboard;
