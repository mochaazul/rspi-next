import React, { useState } from 'react';
import * as Icons from 'react-feather';
import Link from 'next/link';

import { Images, colors, Languages as lang } from '@/constant';
import { Accordion, Button, Text } from '@/components';

import { DoctorCardStyle } from './style';
import ItemAccordion from './ItemAccordion';
import { I_MasterDoctor } from '@/interface';

const language = lang.page.findDoctor;

const DoctorCard = (props: I_MasterDoctor) => {
	const [isOpened, setOpened] = useState<boolean>(false);
	return (
		<DoctorCardStyle>
			{ /* Foto & nama dokter */ }
			<div className='flex gap-4'>
				<img src={ props.img_url || Images.Doctor2 } alt={ props.full_name_doctor } srcSet='' className='rounded-[10px] w-[80px] h-[80px] object-cover' />
				<div className='flex flex-col gap-1 sm:gap-2'>
					<Text
						fontSize='20px'
						lineheight='24px'
						fontWeight='700'
						color={ colors.grey.darker }
						text={ props.full_name_doctor }
					/>
					<div className='flex gap-1 sm:gap-[10px]'>
						<Text
							fontSize='14px'
							lineheight='17px'
							fontWeight='400'
							color={ colors.grey.dark }
							text={ props.specialty }
						/>
					</div>
					<div className='flex gap-1 sm:gap-[10px]'>
						<Text
							fontSize='16px'
							lineheight='17px'
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
								lineheight='14px'
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
			{ isOpened && <div className='mt-12'>
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
				<Link href={ `/doctor-detail/${ props.doctor_code }` }>
					<div className='md:inline-block'>
						<Button theme='outline' className='h-[36px] py-0 grow-0'>
							<div className='flex gap-3 items-center justify-center'>
								<Text
									fontSize='14px'
									lineheight='17px'
									fontWeight='900'
									color={ colors.paradiso.default }
									text={ language.label.seeDetail }
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
