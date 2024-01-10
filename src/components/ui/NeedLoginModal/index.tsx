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
		<Modal visible={ visible } backdropClassname='backdrop-blur-md' width='526px'
			containerClassName='mx-[10px]'>
			<div className='flex flex-col items-center'>
				<center>
					<icons.WarningIcon />
				</center>
				<p className='text-xl font-black md:text-2xl pt-6 font-lato'>
					{ t('heading') }
				</p>
				<p className='text-[16px] text-[#6A6D81] text-center pb-[18px] md:pt-[12px] md:pb-[24px] font-lato'>
					{ t('subHeading') }
				</p>
				<Button className='max-w-full' theme='primary' onClick={ handleLogout }>{ t('btnLabel') }</Button>
			</div>
		</Modal>
	);
};

export default NeedLoginModal;