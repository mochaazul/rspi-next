
import { icons } from '@/constant';
import { Text, Button, Modal } from '@/components';
import { useAppDispatch, useTypedSelector } from '@/hooks';
import { RootAppState } from '@/interface';
import { clearErrorLogout } from '@/stores/Root';
import { removeUser as removeUserData } from '@/stores/User';
import Image from 'next/image';

const LogoutModal = () => {

	const { tokenIsUsed } = useTypedSelector<RootAppState>('rootSlice');
	const removeError = useAppDispatch(clearErrorLogout);
	const removeUser = useAppDispatch(removeUserData);

	return (
		<Modal visible={ tokenIsUsed } onClose={ () => console.log }>
			<div className='flex flex-col items-center'>
				<center>
					<Image src={icons.WarningIcon} alt="" />
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
					removeUser();
					removeError();
				} }>Log Out</Button>
			</div>
		</Modal>
	);
};

export default LogoutModal;