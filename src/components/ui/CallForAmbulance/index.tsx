'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { colors } from '@/constant';
import images from '@/constant/images';
import { HospitalDetail, UserSessionData } from '@/interface';
import { useScopedI18n } from '@/locales/client';
import {
	Button,
	Modal,
	Text
} from '@/components/ui';
import { blacklistedRouteMedicalRecordReminder } from '@/constant/config';

import { CallForAmbulanceStyle, ModalRSTelephoneStyle } from './style';

const CallForAmbulance = ({
	hospitalData,
	session
}: {
	hospitalData: HospitalDetail[],
	session?: UserSessionData;
}) => {
	const pathname = usePathname();
	const t = useScopedI18n('global.callAmbulanceLabel');

	const [visible, setVisible] = useState(false);

	const shouldRenderReminder = !blacklistedRouteMedicalRecordReminder.some(route => pathname.includes(route));

	const hasMedicalRecordReminder = session?.token
		&& (!session?.user?.medical_record || !session?.user?.no_mr || !session?.user?.mr_active)
		&& shouldRenderReminder;

	return (
		<>
			<CallForAmbulanceStyle className={ `
				fixed cursor-pointer flex align-center justify-center 
				max-sm:w-[60px] max-sm:h-[60px] 
				${ hasMedicalRecordReminder ? 'max-md:bottom-28 max-lg:bottom-20' : '' }
			` } onClick={ () => setVisible(true) }>
				<images.AmbulanceIcon className='z-10' />
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
						text={ t('heading') }
						className='mt-5'
					/>
					<Text
						fontSize='14px'
						lineHeight='20px'
						fontWeight='400'
						textAlign='center'
						color={ colors.grey.dark }
						text={ t('subHeading') }
						className='mt-2'
					/>
					<div className='flex flex-col gap-4 mt-8'>
						{
							Object.values(hospitalData || [])?.map(hospital => (
								<Link href={ `tel:${ hospital.phone }` } key={ hospital.id }>
									<Button label={ hospital.name } theme='outline' $hoverTheme='primary' />
								</Link>
							))
						}
					</div>
				</ModalRSTelephoneStyle>
			</Modal>
		</>
	);
};

export default CallForAmbulance;