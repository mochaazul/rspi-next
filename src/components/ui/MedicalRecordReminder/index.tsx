import { icons } from 'constant';
import {
	BgContainer, BodyContainer, FloatingContainer, FloatingWrapper, LeftContent
} from './style';
import Text from 'components/Text';
import Button from 'components/Button';
import { Tooltip } from 'react-tooltip';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from 'hooks';
import { UserState } from 'interface';
import _, { isEmpty } from 'lodash';

const MedicalRecordReminder = () => {
	const { user } = useTypedSelector<UserState>('user');

	const navigate = useNavigate();

	const onClickOnboard = () => {
		setTimeout(() => {
			navigate('/register-onboard');
		}, 1000);
	};

	const renderFloating = () => (
		<FloatingWrapper className='md:ml-5'>
			<FloatingContainer
				className='flex'
			>
				<BgContainer>
					<icons.Circle />
				</BgContainer>
				<BodyContainer
					className='grid grid-cols-[auto_140px] md:grid-cols-[auto_1fr] md:gap-11 gap-4 items-center'
				>
					<LeftContent>
						<Text fontSize='16px' fontWeight='700'>
							Dapatkan Akses terhadap Informasi Kunjungan Medis Anda
						</Text>
						<icons.ExclamationMark data-tooltip-place='top-end' data-tooltip-id='booking-tooltip' style={ { width: '24px' } }/>
					</LeftContent>
					<Button label='Isi Data Rekam Medis' onClick={ () => {
						// navigate('/register-onboard');
						onClickOnboard();
					} }
					className='max-sm:p-[10px] max-sm:text-[12px]'
					/>
				</BodyContainer>
			</FloatingContainer>
			<Tooltip id='booking-tooltip' offset={ 24 } style={ { width: 300, padding: '12px', borderRadius: '5px' } }>
				<Text
					fontSize='12px'
					fontWeight='400'
					lineHeight='23px'
					color='white'
					text='Pastikan Anda telah booking appointment dan melakukan kunjungan ke RSPI terdekat.' />
			</Tooltip>
		</FloatingWrapper>
	);
  
	if (isEmpty(user.token)) return null;
  
	if (!user.medical_record) return renderFloating();
  
	return null;
};

export default MedicalRecordReminder;