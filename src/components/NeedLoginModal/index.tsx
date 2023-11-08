
import { icons } from '@/constant';
import { Text, Button, Modal } from '@/components';
import { useAppDispatch, useTypedSelector } from '@/hooks';
import { RootAppState } from '@/interface';
import { clearErrorNeedLogin } from '@/stores/Root';

const NeedLoginModal = () => {

	const { isNeedLogin } = useTypedSelector<RootAppState>('rootSlice');
	const removeError = useAppDispatch(clearErrorNeedLogin);

	return (
		<Modal visible={ isNeedLogin } onClose={ () => console.log }>
			<div className='flex flex-col items-center'>
				<center>
					<icons.WarningIcon />
				</center>
				<Text
					text='Silakan login'
					fontWeight='700'
					fontSize='24px'
					className='pt-6'
				/>
				<Text
					text='Untuk mengakses halaman ini perlu login terlebih dahulu. '
					fontWeight='400'
					fontSize='16px'
					color='#6A6D81'
					className='pt-4 pb-5'
				/>

				<Button className='max-w-full' theme='primary' onClick={ () => {
					removeError();
				} }>Login</Button>
			</div>
		</Modal>
	);
};

export default NeedLoginModal;