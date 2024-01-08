'use client';

import { icons } from '@/constant';
import { Button, Modal, Text } from '..';
import { useRouter } from 'next/navigation';
import { useSWRConfig } from 'swr';
import { cookiesHelper } from '@/helpers';
import clearSWRCache from '@/helpers/clearSwrCache';
import { useScopedI18n } from '@/locales/client';

type Props = {
	visible: boolean;
	toggler: (arg0: boolean) => void;
	onClose?: () => void;
	callbackUrl?: string;
};

const NeedLoginModal = ({
	visible,
	toggler,
	onClose,
	callbackUrl = ''
}: Props) => {
	const router = useRouter();
	const t = useScopedI18n('modalDialog.needLogin');
	const { cache } = useSWRConfig();

	const handleLogout = async () => {
		await cookiesHelper.clearStorage();
		await clearSWRCache(cache);
		toggler(false);
		router.push(`/login?ref=unauthorized${ callbackUrl ? `&callbackUrl=${ encodeURIComponent(callbackUrl) }` : '' }`);
	};

	return (
		<Modal visible={ visible } backdropClassname='backdrop-blur-md'>
			<div className='flex flex-col items-center'>
				<center>
					<icons.WarningIcon />
				</center>
				<Text
					text={ t('heading') }
					fontWeight='700'
					fontSize='24px'
					className='pt-6'
				/>
				<Text
					text={ t('subHeading') }
					fontWeight='400'
					fontSize='16px'
					color='#6A6D81'
					className='py-[12px]'
				/>
				<Button className='max-w-full' theme='primary' onClick={ handleLogout }>{ t('btnLabel') }</Button>
			</div>
		</Modal>
	);
};

export default NeedLoginModal;