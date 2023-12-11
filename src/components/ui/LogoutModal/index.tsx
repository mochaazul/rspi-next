'use client';

import { icons } from '@/constant';
import { Button, Modal, Text } from '..';
import { useRouter } from 'next/navigation';
import { cookiesHelper } from '@/helpers';
import { useSWRConfig } from 'swr';
import clearSWRCache from '@/helpers/clearSwrCache';
import { useScopedI18n } from '@/locales/client';

type Props = {
	visible: boolean;
	toggler: (arg0: boolean) => void;
	onClose?: () => void;
};
const LogoutModal = ({ visible, toggler, onClose }: Props) => {
	const router = useRouter();
	const t = useScopedI18n('modalDialog.needLogout');
	const { cache } = useSWRConfig();

	const handleLogout = async () => {
		await cookiesHelper.clearStorage();
		await clearSWRCache(cache);
		toggler(false);
		router.push('/login?ref=unauthorized');
	};

	return (
		<Modal visible={ visible } onClose={ onClose } backdropClassname='backdrop-blur-md'>
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
					className='pt-4'
				/>
				<Text
					text={ t('desc') }
					fontWeight='400'
					fontSize='16px'
					color='#6A6D81'
					className='pt-1 pb-4'
				/>
				<Button className='max-w-full' theme='primary' onClick={ handleLogout }>{ t('btnLabel') }</Button>
			</div>
		</Modal>
	);
};

export default LogoutModal;