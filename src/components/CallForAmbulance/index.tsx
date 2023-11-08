"use client";

import { useState } from 'react';

import { Images, colors } from '@/constant';
import { Button, Modal, Text } from '@/components';
import { useTypedSelector } from '@/hooks';
import { HospitalState, UserState } from '@/interface';

import { CallForAmbulanceStyle, ModalRSTelephoneStyle } from './style';

const CallForAmbulance = () => {
	const hospitalSelector = useTypedSelector<HospitalState>('hospital');
	const { user } = useTypedSelector<UserState>('user');

	const [visible, setVisible] = useState(false);

	const shouldGiveMargin = !user.medical_record && user.token;

	return (
		<>
			<CallForAmbulanceStyle className={ `
				fixed cursor-pointer flex align-center justify-center 
				max-sm:w-[72px] max-sm:h-[72px]  ${ shouldGiveMargin ? 'bottom-24' : '' }
			
			` } onClick={ () => setVisible(true) }>
				<div className='absolute w-[80%] h-[80%] mt-1 rounded-full hover:animate-ping z-20' style={ { backgroundColor: colors.red.accentOpacity90 } } />
				<img src={ Images.AmbulanceIcon } alt='Call for Ambulance' className='z-10 relative' />
			</CallForAmbulanceStyle>
			<Modal
				visible={ visible }
				onClose={ () => setVisible(false) }
				width='560px'
			>
				<ModalRSTelephoneStyle className='relative flex flex-col'>
					<div className='flex justify-center'>
						<img src={ Images.AmbulanceIcon } alt='Call for Ambulance' className='z-10 relative' />
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
						{
							hospitalSelector?.hospitals?.map(hospital => (
								<a href={ `tel:${ hospital.phone }` } key={ hospital.id }>
									<Button label={ hospital.name } theme='outline' hoverTheme='primary' />
								</a>
							))
						}
					</div>
				</ModalRSTelephoneStyle>
			</Modal>
		</>
	);
};

export default CallForAmbulance;