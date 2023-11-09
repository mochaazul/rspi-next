import Image from 'next/image';
import Button from '@/components/Button';
import Spinner from '@/components/Spinner';
import Text from '@/components/Text';
import { removeUser as removeUserData } from '@/stores/User';
import { icons } from '@/constant';
import languages from '@/constant/languages';
import { useRouter } from 'next/navigation';
import { SpinContainer } from './style';
import { UserState } from '@/interface';
import { useAppDispatch, useTypedSelector } from '@/hooks';

type Props = {
	status?: 'loading' | 'success' | 'failed';
};

const SpinVerification = ({ status }: Props) => {
	const navigate = useRouter();

	const userSelector = useTypedSelector<UserState>('user');
	const { user, userDetail } = userSelector;
	const isLoggedIn = !!user.token;
	const removeUser = useAppDispatch(removeUserData);

	const handleBackLogin = () => {
		if (isLoggedIn) {
			removeUser();
		}
		navigate.replace('/login');
	};

	return <SpinContainer>
		<div className='status-cont'>
			<div className={ `status loading ${ status === 'loading' && 'active' }` }>
				<Spinner size='xl' />
			</div>
			<div className={ `status success ${ status === 'success' && 'active' }` }>
				<div className='icon-cont'>
					<Image src={icons.Check} alt="" className='svg-white' />
				</div>
			</div>
			<div className={ `status failed ${ status === 'failed' && 'active' }` }>
				<div className='icon-cont'>
					<Image src={icons.Close} alt="" className='svg-white' />
				</div>
			</div>
		</div>
		<div>
			<div className='desc-cont'>
				<Text
					fontSize='32px'
					fontWeight='900'
					lineheight='48px'
					text='Mohon Tunggu Sebentar...'
					className={ `loading ${ status === 'loading' && 'active' }` }
					subClassName='text-center'
				/>
				<Text
					fontSize='32px'
					fontWeight='900'
					lineheight='48px'
					text='Validation Succesfull'
					className={ `success ${ status === 'success' && 'active' }` }
					subClassName='text-center'
				/>
				<Text
					fontSize='32px'
					fontWeight='900'
					lineheight='48px'
					text={ languages.validation.tokenValidation.failed }
					className={ `failed ${ status === 'failed' && 'active' }` }
					subClassName='text-center'
				/>
			</div>
			<div className={ `back-login failed ${ status !== 'failed' && 'hidden' }` }>
				<Button
					theme='primary'
					hoverTheme='outline'
					label='Back to Login'
					onClick={ handleBackLogin }
				/>
			</div>
		</div>
	</SpinContainer>;
};

export default SpinVerification;