import { icons } from '@/constant';
import { Button, Modal, Text } from '..';
import { useRouter } from 'next/navigation';

type Props = {
	visible: boolean,
	toggler: (arg0: boolean) => void
}
const LogoutModal = ({ visible, toggler }:Props) => {
	
	const router = useRouter();

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
				<Button className='max-w-full' theme='primary' onClick={ () => {
					toggler(false);
					router.push('/login');
				} }>Log Out</Button>
			</div>
		</Modal>
	);
};

export default LogoutModal;