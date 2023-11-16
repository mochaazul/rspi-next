'use client';

import { icons } from '@/constant';
import Image from 'next/image';
import {
	BgContainer,
	BodyContainer,
	FloatingContainer,
	FloatingWrapper,
	LeftContent
} from './style';
import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';
// import { Tooltip } from 'react-tooltip'; Migrate
// import { useRouter } from 'next/navigation'; Migrate
// import { useTypedSelector } from '@/hooks'; Migrate
// import { UserState } from '@/interface'; Migrate
// import _, { isEmpty } from 'lodash'; Migrate

const MedicalRecordReminder = () => {
	// const { user } = useTypedSelector<UserState>('user'); // migrate

	// const navigate = useRouter(); Migrate

	const onClickOnboard = () => {
		setTimeout(() => {
			// navigate.push('/register-onboard'); Migrate
		}, 1000);
	};

	const renderFloating = () => (
		<FloatingWrapper className='md:ml-5'>
			<FloatingContainer
				className='flex'
			>
				<BgContainer>
					<Image src={ icons.Circle } alt='' />
				</BgContainer>
				<BodyContainer
					className='grid grid-cols-[auto_140px] md:grid-cols-[auto_1fr] md:gap-11 gap-4 items-center'
				>
					<LeftContent>
						<Text fontSize='16px' fontWeight='700'>
							Dapatkan Akses terhadap Informasi Kunjungan Medis Anda
						</Text>
						<Image src={ icons.ExclamationMark } alt='' data-tooltip-place='top-end' data-tooltip-id='booking-tooltip' style={ { width: '24px' } } />
					</LeftContent>
					<Button label='Isi Data Rekam Medis' onClick={ () => {
						// navigate.push('/register-onboard');
						onClickOnboard();
					} }
					className='max-sm:p-[10px] max-sm:text-[12px]'
					/>
				</BodyContainer>
			</FloatingContainer>
			{/* <Tooltip id='booking-tooltip' offset={ 24 } style={ { width: 300, padding: '12px', borderRadius: '5px' } }>
				<Text
					fontSize='12px'
					fontWeight='400'
					lineHeight='23px'
					color='white'
					text='Pastikan Anda telah booking appointment dan melakukan kunjungan ke RSPI terdekat.' />
			</Tooltip> Migrate */}
		</FloatingWrapper>
	);

	// if (isEmpty(user.token)) return null; // migrate
	// if (!user.medical_record) return renderFloating(); // migrate

	return null;
};

export default MedicalRecordReminder;