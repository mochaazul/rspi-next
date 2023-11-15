'use client';

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { appStage } from '@/config';
import { Images, colors } from '@/constant';

import { FooterDetail, FooterState } from '@/interface/footer';

import FooterStyled, { FooterContainer } from './style';
import Image from 'next/image';
import Text from '@/components/ui/Text';
import Socmed from '@/components/ui/Socmed';
import TextField from '@/components/ui/TextField';
import Button from '@/components/ui/Button';

const FooterLayout = () => {
	const router = useRouter();

	// const { loading, footerList } = useTypedSelector<FooterState>('footerSlice'); // TODO: migrate
	// const fetchFooter = useAppDispatch(getFooterSlug); // TODO: migrate

	const [ourHospital, setOurHospital] = useState<FooterDetail[]>([]);
	const [ourCompany, setOurCompany] = useState<FooterDetail[]>([]);
	const [privacyPolicy, setPrivacyPolicy] = useState<FooterDetail[]>([]);
	const [pages, setPages] = useState<FooterDetail[]>([]);

	// TODO: migrate
	// useEffect(() => {
	// 	fetchFooter({
	// 		queryParam: {
	// 			slug: '',
	// 			footer_category: '',
	// 			limit: 999,
	// 		}
	// 	});
	// 	// Clear state, prevent double item
	// 	setOurHospital([]);
	// 	setOurCompany([]);
	// 	setPrivacyPolicy([]);
	// 	setPages([]);
	// 	// Iterate over the footerList using the forEach method instead of map
	// 	footerList?.forEach(item => {
	// 		// Use a switch statement to check the footer_category of each item
	// 		switch (item?.footer_category) {
	// 			case 'our-hospital':
	// 				setOurHospital(ourHospital => [...ourHospital, item]);
	// 				break;
	// 			case 'our-company':
	// 				setOurCompany(ourCompany => [...ourCompany, item]);
	// 				break;
	// 			// case 'privacy-policy':
	// 			// 	setPrivacyPolicy(privacyPolicy => [...privacyPolicy, item]);
	// 			// 	break;
	// 			case 'pages':
	// 				setPages(pages => [...pages, item]);
	// 				break;
	// 			// Use a default case to handle items with unknown footer_category values
	// 			default:
	// 				break;
	// 		}
	// 	});
	// }, []);

	// const language = lang.page.footer;
	// End migrate

	const renderItems = (items: FooterDetail[]) => {
		return items.map((item, index) => {
			return (
				<div key={ index } className='cursor-pointer' onClick={ () => { router.push(`/footer/${ item.slug }`); location.reload(); } }>
					<Text fontSize='14px' className='bold'>{ item.title }</Text>
				</div>
			);
		});
	};

	const date = new Date();

	return (
		<>
			<FooterStyled className='max-sm:pb-32'>
				<FooterContainer>
					<div className='mb-3'>
						<Text fontSize='14px' color={ colors.paradiso.default } className='mb-4'>OUR HOSPITALS</Text>
						{ renderItems(ourHospital) }
					</div>
					<div>
						<Text fontSize='14px' color={ colors.paradiso.default } className='mb-4'>OUR COMPANY</Text>
						{ renderItems(ourCompany) }
					</div>
					<div className='visitor-patient-container mb-3'>
						<Text fontSize='14px' color={ colors.paradiso.default } className='mb-4'>VISITOR & PATIENT INFORMATION</Text>
						<div className='visitor-items'>
							<div className='mr-4'>
								{ renderItems(pages) }
							</div>
						</div>
					</div>
					<div className='follow-section flex flex-col max-sm:flex-row-reverse'>
						<div className='follow-icon-section'>
							<Text fontSize='14px' color={ colors.paradiso.default } className='mb-4'>Follow Us</Text>
							<Socmed />
						</div>
						<div>
							<Text fontSize='14px' color={ colors.paradiso.default } className='mt-2'>GET RSPI MOBILE</Text>
							<div className='store-images-container'>
								<a href='https://play.google.com/store/apps/details?id=id.co.rspondokindah&hl=id' target='blank' rel='norel norefferer'><Image src={ Images.GooglePlay } alt='google play icon' className='store-images' /></a>
								<a href='https://apps.apple.com/id/app/rspi-mobile/id1181707029?l=id' target='blank' rel='norel norefferer'><Image src={ Images.AppStore } alt='app store icon' className='store-images' /></a>
							</div>
						</div>
					</div>
					<div className='email-sub-container'>
						<Text fontSize='14px' color={ colors.paradiso.default } className='mb-4'>Stay Updated With Us</Text>
						<Text fontSize='14px' className='sub-text'>Daftarkan e-mail Anda untuk berlangganan newsletter dan mendapatkan informasi terbaru dari RS Pondok Indah Group.</Text>
						<div className='email-sub-form-container'>
							<TextField width='100%' placeholder='Enter your email address' />
							<Button className='sub-button color-default' theme='secondary' label='Subscribe' />
						</div>
					</div>
				</FooterContainer>
				<div className='flex justify-center'>
					<Text textAlign='center' fontSize='14px' color={ colors.grey.dark }>Copyright © { date.getFullYear() } RS Pondok Indah Group.  All Rights Reserved.</Text>
				</div>
				{ /** todo: migrate */
					// appStage !== 'prod' &&
					<div className='flex justify-center'>
						<Text textAlign='center' fontSize='14px' color={ colors.grey.dark }> Version 0 - development</Text>
					</div>
				}
			</FooterStyled>
		</>
	);

};

export default React.memo(FooterLayout);