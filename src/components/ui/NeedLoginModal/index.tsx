import { icons } from '@/constant';
import { Button, Modal, Text } from '..';
import { useRouter } from 'next/navigation';

type Props = {
	visible: boolean,
	toggler: (arg0: boolean) => void;
};
const NeedLoginModal = ({ visible, toggler }: Props) => {

	const router = useRouter();

	return (
		<Modal visible={ visible } onClose={ () => console.log } backdropClassname='backdrop-blur-md'>
			<div className='flex flex-col items-center'>
				<center>
					<icons.WarningIcon />
				</center>
				<Text
					text='Silahkan Login'
					fontWeight='700'
					fontSize='24px'
					className='pt-6'
				/>
				<Text
					text='Untuk mengakses halaman ini perlu login terlebih dahulu. '
					fontWeight='400'
					fontSize='16px'
					color='#6A6D81'
					className='pt-4 pb-4'
				/>
				<Button className='max-w-full' theme='primary' onClick={ () => {
					toggler(false);
					router.push('/login');
				} }>Login</Button>
			</div>
		</Modal>
	);
};

export default NeedLoginModal;