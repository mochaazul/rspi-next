'use client';

import { useState } from 'react';
import Image from 'next/image';

import { colors } from '@/constant';
import images from '@/constant/images';

import { CallForAmbulanceStyle, ModalRSTelephoneStyle } from './style';
import Modal from '../ui/Modal';
import Text from '../ui/Text';
import Button from '../ui/Button';

const CallForAmbulance = () => {

	// const hospitalSelector = useTypedSelector<HospitalState>('hospital'); // migrate
	// const { user } = useTypedSelector<UserState>('user'); //migrate

	const [visible, setVisible] = useState(false);

	// const shouldGiveMargin = !user.medical_record && user.token; // migrate

	return (
		<>
			{ /* Migrate  */ }
			{/* TBD max-sm:w-[60px] max-sm:h-[60px]  ${ shouldGiveMargin ? 'bottom-24' : '' } */ }
			<CallForAmbulanceStyle className={ `
				fixed cursor-pointer flex align-center justify-center 
				max-sm:w-[60px] max-sm:h-[60px] }
			
			` } onClick={ () => setVisible(true) }>
				<div className='absolute w-[80%] h-[80%] mt-1 rounded-full hover:animate-ping z-20' style={ { backgroundColor: colors.red.accentOpacity90 } } />
				<images.AmbulanceIcon className='z-10 relative' />
			</CallForAmbulanceStyle>
			<Modal
				visible={ visible }
				onClose={ () => setVisible(false) }
				width='560px'
			>
				<ModalRSTelephoneStyle className='relative flex flex-col'>
					<div className='flex justify-center'>
						<images.AmbulanceIcon className='z-10 relative' />
					</div>
					<Text
						fontSize='24px'
						lineHeight='28px'
						fontType='h3'
						fontWeight='700'
						textAlign='center'
						color={ colors.grey.darker }
						text='Call an Ambulance'
						className='mt-5'
					/>
					<Text
						fontSize='14px'
						lineHeight='20px'
						fontWeight='400'
						textAlign='center'
						color={ colors.grey.dark }
						text='Please select hospital:'
						className='mt-2'
					/>
					<div className='flex flex-col gap-4 mt-8'>
						{ /* TODO: Migrate */ }
						{ /* { */ }
						{ /* hospitalSelector?.hospitals?.map(hospital => ( */ }
						<a href={ 'tel:0341' } key={ 0 }>
							<Button label='Hospital Name' theme='outline' hoverTheme='primary' />
						</a>
						{ /* <a href={ `tel:${ hospital.phone }` } key={ hospital.id }>
									<Button label={ hospital.name } theme='outline' hoverTheme='primary' />
								</a> */ }
						{ /* )) */ }
						{ /* } */ }
						{ /* End Migrate */ }
					</div>
				</ModalRSTelephoneStyle>
			</Modal>
		</>
	);
};

export default CallForAmbulance;