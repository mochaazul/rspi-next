import React from 'react';
import useDashboard from './useDashboard';
import { ContentModal, DashoardStyle, FloatingButton, Modal } from './style';
import { Button, Form } from '@/components';

const Dashboard: React.FC = () => {

	const {
		articles,
		limit,
		loadingArticle,
		onChangeLimit,
		onClickPagination,
		modalVisible,
		setModalVisible,
		onOk,
		modalType,
		onDeleteArticle,
		addArticleField,
		setIdArticle
	} = useDashboard();
	const {
		registeredValue, onSubmit, setFieldsValue, resetFieldsValue
	} = Form.useForm({ fields: addArticleField });

	const renderPostList = () => {
		if (!articles?.length) return null;

		return articles?.map((article, index) => (
			<div key={ index } className='posts'>
				<div>
					<h2>{ article.title }</h2>
				</div>
				<div>
					<span onClick={ () => {
						setModalVisible(modalType.UPDATE);
						setIdArticle(article.id);
						setFieldsValue({
							title: article.title,
							content: article.content
						});
					} }
					>Edit | </span>
					<span onClick={ () => onDeleteArticle(article.id) }>Delete</span>
				</div>
			</div>
		));
	};

	return (
		<>
			<DashoardStyle>
				<h1>PAGINATION</h1>
				<div className='list-container'>
					{ renderPostList() }
					{ loadingArticle && <h1>LOADING...</h1> }
				</div>

				<div style={ { margin: '40px 0' } }>
					<select onChange={ onChangeLimit } value={ limit }>
						{
							Array.from({ length: 10 }, (_, i) => (i + 1) * 10).map((arr, index) => (
								<option value={ arr } key={ index }>{ arr }</option>
							))
						}
					</select>
					<Button label='Prev Page' onClick={ () => onClickPagination('prev') } />
					<Button label='Next Page' onClick={ () => onClickPagination('next') } />
				</div>

				<h1>LOAD MORE</h1>
				<div className='list-container' />
				<FloatingButton>
					<Button label='+' width='100%' onClick={ () => setModalVisible(modalType.ADD) } />
				</FloatingButton>
			</DashoardStyle>
			<Modal modalVisible={ modalVisible !== modalType.INIT }>
				<ContentModal>
					<Form onSubmit={ e => {
						const { title, content } = onSubmit(e);
						onOk(title.value, content.value);
						resetFieldsValue();
					} }>
						<Form.FormGroup>
							<Form.Label>Title</Form.Label>
							<Form.TextField placeholder='Title' { ...registeredValue('title') } />
						</Form.FormGroup>
						<Form.FormGroup>
							<Form.Label>Content</Form.Label>
							<Form.TextField placeholder='Content' { ...registeredValue('content') } />
						</Form.FormGroup>
						<Button label='Ok' type='submit' />
						<Button label='Cancel' type='reset' onClick={ () => {
							setModalVisible(modalType.INIT);
							resetFieldsValue();
						} } />
					</Form>
				</ContentModal>
			</Modal>
		</>
	);
};

export default Dashboard;
