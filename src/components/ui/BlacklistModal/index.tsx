'use client';

import { icons } from '@/constant';
import { Button, Modal, Text } from '..';
import { useRouter } from 'next/navigation';
import { useSWRConfig } from 'swr';
import { cookiesHelper } from '@/helpers';
import clearSWRCache from '@/helpers/clearSwrCache';
import { useScopedI18n } from '@/locales/client';
import Link from 'next/link';

type Props = {
	visible: boolean;
	toggler: (arg0: boolean) => void;
	onClose?: () => void;
	callbackUrl?: string;
  msg?: string
};

const BlacklistModal = ({
	visible,
	toggler,
	onClose,
	msg,
	callbackUrl = ''
}: Props) => {

	const t = useScopedI18n('blacklist');
  
	return (
		<Modal visible={ visible } onClose={ onClose } backdropClassname='backdrop-blur-md' >
			<div className='flex flex-col items-center'>
				<center>
					<icons.WarningIcon />
				</center>
				<Text
					text={ msg }
					fontWeight='400'
					fontSize='16px'
					color='#6A6D81'
					lineHeight='20px'
					textAlign='center'
					className='pt-4 pb-8 w-[400px] text-center'
				/>
				<Link href={ '/contact-us' }>
				  <Button className='max-w-full' theme='primary' >{ t('contactUs') }</Button>
				</Link>
			</div>
		</Modal>
	);
};

export default BlacklistModal;