import { icons } from '@/constant';
import { Button, Modal, Text } from '..';
import { useRouter } from 'next/navigation';
import { cookiesHelper } from '@/helpers';
import { useSWRConfig } from 'swr';
import clearSWRCache from '@/helpers/clearSwrCache';

type Props = {
	visible: boolean,
	toggler: (arg0: boolean) => void;
};
const LogoutModal = ({ visible, toggler }: Props) => {

	const router = useRouter();
	const { cache } = useSWRConfig();

	const handleLogout = async () => {
		await cookiesHelper.clearStorage();
		await clearSWRCache(cache);
		toggler(false);
		router.push('/login?ref=unauthorized');
	};

	return (
		<Modal visible={ visible } onClose={ () => console.log } backdropClassname='backdrop-blur-md'>
			<div className='flex flex-col items-center'>
				<center>
					<icons.WarningIcon />
				</center>
				<Text
					text='Akses masuk terdeteksi!'
					fontWeight='700'
					fontSize='24px'
					className='pt-6'
				/>
				<Text
					text='Terdapat akses baru yang masuk ke akun Anda pada perangkat lain. '
					fontWeight='400'
					fontSize='16px'
					color='#6A6D81'
					className='pt-4'
				/>
				<Text
					text='Silahkan log out secara manual. '
					fontWeight='400'
					fontSize='16px'
					color='#6A6D81'
					className='pt-1 pb-4'
				/>
				<Button className='max-w-full' theme='primary' onClick={ handleLogout }>Log Out</Button>
			</div>
		</Modal>
	);
};

export default LogoutModal;