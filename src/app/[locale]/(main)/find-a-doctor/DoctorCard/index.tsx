import React, { useState } from 'react';
import * as Icons from 'react-feather';
import Link from 'next/link';
import Image from 'next/image';
import { isMobile } from 'react-device-detect';

import { Images, colors } from '@/constant';
import { Accordion, Button, Text } from '@/components/ui';
import { I_MasterDoctor } from '@/interface';
import { useScopedI18n } from '@/locales/client';

import { DoctorCardStyle } from './style';
import ItemAccordion from './ItemAccordion';

const DoctorCard = (props: I_MasterDoctor) => {
	const t = useScopedI18n('page.findDoctor');

	const [isOpened, setOpened] = useState<boolean>(false);

	return (
		<DoctorCardStyle>
			{ /* Foto & nama dokter */ }
			<div className='flex gap-4'>
				<Image src={ props.img_url || Images.Doctor2 } alt={ props.full_name_doctor } width={ 80 } height={ 80 } className='rounded-[10px] w-[80px] h-[80px] object-cover' />
				<div className='flex flex-col gap-1 sm:gap-2'>
					<Text
						fontSize='20px'
						lineHeight='24px'
						fontWeight='700'
						color={ colors.grey.darker }
						text={ props.full_name_doctor }
					/>
					<div className='flex gap-1 sm:gap-[10px]'>
						<Text
							fontSize='14px'
							lineHeight='17px'
							fontWeight='400'
							color={ colors.grey.dark }
							text={ props.specialty }
						/>
					</div>
					<div className='flex gap-1 sm:gap-[10px]'>
						<Text
							fontSize='16px'
							lineHeight='17px'
							fontWeight='700'
							color={ colors.green.brandAccent }
							text={ isOpened ? 'Tutup Jadwal' : 'Lihat Jadwal' }
							onClick={ () => setOpened(!isOpened) }
							className='cursor-pointer'
						/>
					</div>
					{ /* currently not available on response
						TODO TODO TODO */ }
					<div className={ `flex ${ true ? 'hidden' : '' }` }>
						<div className='telemedicine-available'>
							<Icons.Video size={ 14 } color={ colors.white.default } />
							<Text
								fontSize='12px'
								lineHeight='14px'
								fontWeight='700'
								subClassName='max-sm:text-[12px]'
								color={ colors.white.default }
								text={ 'Telemedicine  Available' }
							/>
						</div>
					</div>
				</div>
			</div>
			{ /* List accordion RS */ }
			{ isOpened && <div className={ `${ isMobile ? 'mt-6' : 'mt-12' }` }>
				<Accordion
					onlyOpenOne={ false }
					itemTheme={ itemProps => <ItemAccordion props={ itemProps } hospitals={ props?.doctor_schedule } /> }
					itemWrapperClassname='mt-0'
					hideItemBorderBottom
					datas={ props?.doctor_schedule?.map(schedule => ({
						title: schedule.hospital,
						desc: '',
						isJSXDesc: true,
						desc_jsx: <ItemAccordion.ItemChildren clinics={ schedule.clinics } />,
						schedule,
					})) }
				/>
			</div>
			}
			{ /* Button lihat detail */ }
			<div className='mt-4 text-right sm:mt-6'>
				<Link href={ `/doctor/${ props.doctor_code }` }>
					<div className='md:inline-block'>
						<Button theme='outline' className='h-[36px] py-0 grow-0'>
							<div className='flex gap-3 items-center justify-center'>
								<Text
									fontSize='14px'
									lineHeight='17px'
									fontWeight='900'
									color={ colors.paradiso.default }
									text={ t('label.seeDetail') }
								/>
								<Icons.ArrowRight size={ 18 } color={ colors.paradiso.default } />
							</div>
						</Button>
					</div>
				</Link>
			</div>
		</DoctorCardStyle>
	);
};

export default React.memo(DoctorCard);
