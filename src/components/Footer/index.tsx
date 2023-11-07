import React from 'react';
import { Link } from 'react-router-dom';

import { appStage, config } from 'config';
import { colors, Images, Languages as lang } from 'constant';
import { useTypedSelector } from 'hooks';
import { HospitalState } from 'interface';
import { Button, Text, TextField, Socmed } from 'components';

import FooterStyled, { FooterContainer } from './style';

const FooterLayout = () => {
	const { hospitals } = useTypedSelector<HospitalState>('hospital');

	const language = lang.page.footer;

	type FooterItemsType = {
		label: string,
		link: string;
	};
	type FooterItemList = {
		ourCompany: FooterItemsType[],
		visitorInformation: FooterItemsType[],
		patientInformation: FooterItemsType[];
	};

	const FooterItems: FooterItemList = {
		ourCompany: [
			{ label: 'About Us', link: '#' },
			{ label: 'Privacy Policy', link: '#' },
			{ label: 'Career', link: '#' },
			{ label: 'Contact Us', link: '/contact-us' }
		],
		visitorInformation: [
			{ label: language.visitorInfo.hospitalDirectory, link: '#' },
			{ label: 'Patient Relations', link: '#' },
			{ label: language.visitorInfo.partnerInsurance, link: '#' },
			{ label: language.visitorInfo.paymentAdministration, link: '#' },
		],
		patientInformation: [
			{ label: language.patientInfo.visitHoursPolicy, link: '#' },
			{ label: 'RSPI Mobile', link: '#' },
			{ label: 'Telemedicine RS Pondok Indah Group', link: '#' },
			{ label: language.patientInfo.ourEffort, link: '#' },
		]
	};

	const renderItems = (items: FooterItemsType[]) => {
		return items.map((item, index) => {
			return (
				<Link to={ item.link } key={ index } onClick={ () => {
					window.scrollTo({ top: 0, behavior: 'smooth' });
				} }>
					<Text fontSize='14px' className='bold'>{ item.label }</Text>
				</Link>
			);
		});
	};
	const date = new Date();

	return (
		<>
			<FooterStyled>
				<FooterContainer>
					<div className='mb-3'>
						<Text fontSize='14px' color={ colors.paradiso.default } className='mb-4'>OUR HOSPITALS</Text>
						{ hospitals.map((item, index) => {
							return (
								<Text fontSize='14px' className='bold' key={ index }>{ item.name }</Text>
							);
						}) }
					</div>
					<div>
						<Text fontSize='14px' color={ colors.paradiso.default } className='mb-4'>OUR COMPANY</Text>
						{ renderItems(FooterItems.ourCompany) }
					</div>
					<div className='visitor-patient-container mb-3'>
						<Text fontSize='14px' color={ colors.paradiso.default } className='mb-4'>VISITOR & PATIENT INFORMATION</Text>
						<div className='visitor-items'>
							<div className='mr-4'>
								{ renderItems(FooterItems.visitorInformation) }
							</div>
							<div>
								{ renderItems(FooterItems.patientInformation) }
							</div>
						</div>
					</div>
					<div className='follow-section'>
						<div className='follow-icon-section'>
							<Text fontSize='14px' color={ colors.paradiso.default } className='mb-4'>Follow Us</Text>
						</div>
						<Socmed />
						<Text fontSize='14px' color={ colors.paradiso.default } className='mt-2'>GET RSPI MOBILE</Text>
						<div className='store-images-container'>
							<a href='https://play.google.com/store/apps/details?id=id.co.rspondokindah&hl=id' target='blank' rel='norel norefferer'><img src={ Images.GooglePlay } alt='google play icon' className='store-images' /></a>
							<a href='https://apps.apple.com/id/app/rspi-mobile/id1181707029?l=id' target='blank' rel='norel norefferer'><img src={ Images.AppStore } alt='app store icon' className='store-images' /></a>
						</div>
					</div>
					<div className='email-sub-container'>
						<Text fontSize='14px' color={ colors.paradiso.default } className='mb-4'>Stay Updated With Us</Text>
						<Text fontSize='14px' className='sub-text'>Daftarkan e-mail Anda untuk berlangganan newsletter dan mendapatkan informasi terbaru dari RS Pondok Indah Group.</Text>
						<div className='email-sub-form-container'>
							<TextField width='100%' placeholder='Enter your email address' />
							<Button className='sub-button color-default' theme='primary' label='Subscribe' />
						</div>
					</div>
				</FooterContainer>
				<div className='flex justify-center'>
					<Text textAlign='center' fontSize='14px' color={ colors.grey.dark }>Copyright © { date.getFullYear() } RS Pondok Indah Group.  All Rights Reserved.</Text>
				</div>
				{
					appStage !== 'prod' &&
					<div className='flex justify-center'>
						<Text textAlign='center' fontSize='14px' color={ colors.grey.dark }> Version { config.version } - { appStage.toUpperCase() }</Text>
					</div>
				}
			</FooterStyled>
		</>
	);

};

export default React.memo(FooterLayout);