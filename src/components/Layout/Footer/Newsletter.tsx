'use client';
import { Button, Modal, Text, TextField } from '@/components/ui';
import { colors, icons } from '@/constant';
import { NewsletterPayload } from '@/interface';
import { useSubscribe } from '@/lib/api/client/newsletter';
import { useScopedI18n } from '@/locales/client';
import { useState } from 'react';

const NewsLetter = () => {
	const { trigger: subscribe } = useSubscribe();
  
	const [loadingSubs, setLoadingSubs] = useState<boolean>(false);
	const [modalNewsletter, setModalNewsletter] = useState<boolean>(false);
	const [emailNewsletter, setEmailNewsletter] = useState<string>('');
	const [msgNewsletter, setMsgNewsletter] = useState<string>('');

	const t = useScopedI18n('page.footer');
  
	const subscribeNewsletter = () => {
		if (emailNewsletter !== '') {
			setLoadingSubs(true);
			const subscribePayload: NewsletterPayload = {
				email: decodeURIComponent(emailNewsletter),
			};
			subscribe(subscribePayload).then(res => {
				setModalNewsletter(true);
				setMsgNewsletter(res?.stat_msg ?? '');
				setEmailNewsletter('');
				setLoadingSubs(false);
			});
		} else {
			setModalNewsletter(true);
			setMsgNewsletter('error');
		}

	};

	return (
		<div className='flex items-center mt-4 lg:mt-6 w-full'>
			<div className='-mr-2 flex-1'>
				<TextField
					width='100%'
					placeholder={ t('subscribePlaceholder') }
					className='text-sm sm:text-base text-[#BDBDBD] !h-11 !w-full'
					value={ emailNewsletter }
					onChange={ e => setEmailNewsletter(e.target.value) }
				/>
			</div>
			<Button
				className={ ` ${ loadingSubs ? '!bg-gray-50 !text-gray-300 cursor-not-allowed' : '' } sub-button !text-base !font-bold !h-[48px]` }
				theme='secondary'
				label={ t('subscribeSubmit') }
				onClick={ subscribeNewsletter }
				disabled={ loadingSubs }
			/>
			<Modal
				visible={ modalNewsletter }
				onClose={ () => setModalNewsletter(false) }
				width='560px'
			>
				<div className='relative flex flex-col items-center'>
					{ msgNewsletter === 'Success' ? <icons.Confirmed /> : <div className='p-4 bg-gray-200 rounded-full'><icons.Close /></div> }
					<Text
						fontSize='23px'
						lineHeight='19px'
						fontType='h4'
						fontWeight='900'
						color={ colors.grey.darker }
						text={ msgNewsletter === 'Success' ? t('successSubs') : t('errorSubs') }
						className='mt-5'
					/>
					<Button type='submit' label={ t('handleButtonModalSubmit') } className='mt-[32px]' onClick={ () => setModalNewsletter(false) } />
				</div>
			</Modal>
		</div>
	);
};

export default NewsLetter;