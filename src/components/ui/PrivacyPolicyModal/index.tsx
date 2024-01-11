'use client';

import { ChangeEvent, useState } from 'react';

import {
	Divider,
	FooterSection,
	HeaderItem,
	HeaderSection,
	NumberContainer,
	PrivacyPolicyContainer,
	ScrollableContentContainer
} from './style';

import dataPrivacyPolicyId from './dataPrivacyPolicyId';
import dataPrivacyPolicyEn from './dataPrivacyPolicyEn';
import termConditionsEn from './termConditionsEn';
import termConditionsId from './termConditionsId';

import Text from '../Text';
import TextHtml from '../TextHtml';
import Checkbox from '../Checkbox';
import Button from '../Button';
import Spinner from '../Spinner';
import Modal from '../Modal';
import { useScopedI18n, useCurrentLocale } from '@/locales/client';

type checkedValsType = {
	pp: boolean,
	toc: boolean;
};

type Props = {
	isOpen: boolean;
	onFinish: () => void;
	onClose: () => void,
	loading: boolean;
};

const PrivacyPolicyModal = ({
	isOpen,
	onFinish,
	onClose,
	loading
}: Props) => {

	const languages = useScopedI18n('page.privacyPolicy');
	const currentLang = useCurrentLocale();
	const dataPrivacyPolicy = currentLang === 'id' ? dataPrivacyPolicyId : dataPrivacyPolicyEn;
	const dataTermConditions = currentLang === 'id' ? termConditionsId : termConditionsEn;

	const [step, setStep] = useState<'pp' | 'toc'>('pp');
	const [checkVals, setCheckVals] = useState<checkedValsType>({
		pp: false,
		toc: false
	});

	const onChecked = (evt: ChangeEvent<HTMLInputElement>) => {
		setCheckVals({ ...checkVals, [evt.target.name]: evt.target.checked });
	};

	const onNext = () => {
		if (step === 'pp') {
			setStep('toc');
		} else {
			onFinish();
		}
	};

	const renderFooterSection = () => {
		if (step === 'pp') {
			return (
				<div className='flex justify-between items-center max-sm:flex-col max-sm:w-full max-sm:gap-4 max-sm:items-start'>
					<Checkbox name='pp' onChange={ onChecked } checked={ checkVals['pp'] } label={
						<Text
							fontSize='16px'
							fontWeight='400'
							lineHeight='20px'
						>
							{ languages('agreementStatement.preText') } <strong>{ languages('agreementStatement.boldText') }</strong> { languages('agreementStatement.tailText') } Privacy Policy.
						</Text>
					} />
					<Button className='w-[200px] py-[8px] max-sm:py-[13px] max-sm:px-[40px] px-[16px] rounded-[2px] max-sm:w-full' label={ languages('buttonPrivacy') } disabled={ !checkVals['pp'] } onClick={ onNext }>
						{ loading ? <Spinner /> : languages('buttonPrivacy') }
					</Button>
				</div>
			);
		}
		return (
			<div className='flex justify-between items-center max-sm:flex-col max-sm:w-full max-sm:gap-4 max-sm:items-start'>
				<Checkbox name='toc' onChange={ onChecked } checked={ checkVals['toc'] } label={
					<Text
						fontSize='16px'
						fontWeight='400'
						lineHeight='20px'
					>
						{ languages('agreementStatement.preText') } <strong>{ languages('agreementStatement.boldText') }</strong> { languages('agreementStatement.tailText') } Terms and Conditions.
					</Text>
				} />
				<Button className='w-[200px] py-[8px] max-sm:py-[13px] max-sm:px-[40px] px-[16px] rounded-[2px] max-sm:w-full' label={ languages('buttonTnC') } disabled={ !checkVals['toc'] || loading } onClick={ onNext }>
					{ loading ? <Spinner /> : languages('buttonTnC') }
				</Button>
			</div>
		);

	};

	return <Modal
		wrapperClassName='max-sm:items-end'
		containerClassName='max-sm:rounded-[16px]'
		modalClassName='max-sm:w-full'
		visible={ isOpen }
		width='726px'
		noPadding
		onClose={ onClose }>
		<PrivacyPolicyContainer>
			<HeaderSection className='max-sm:px-[16px] rounded-[8px] max-sm:rounded-[16px] '>
				<HeaderItem className='max-sm:truncate'>
					<NumberContainer className='max-sm:text-[16px]' isActive={ step === 'pp' }>1</NumberContainer>
					<Text
						fontSize='20px'
						fontWeight='900'
						text='Privacy Policy'
						color={ step === 'pp' ? '#2A2536' : '#6A6D81' }
						subClassName='max-sm:text-[16px]'
					/>
				</HeaderItem>
				<Divider />
				<HeaderItem className='max-sm:truncate'>
					<NumberContainer className='max-sm:text-[16px]' isActive={ step === 'toc' }>2</NumberContainer>
					<Text
						fontSize='20px'
						fontWeight='900'
						text='Terms and Conditions'
						color={ step === 'toc' ? '#2A2536' : '#6A6D81' }
						subClassName='max-sm:text-[16px]'
					/>
				</HeaderItem>
			</HeaderSection>
			<div className='px-[24px] max-sm:px-[16px] max-sm:h-[55vh] max-sm:!max-h-[55vh]'>
				<ScrollableContentContainer className='max-sm:h-full max-sm:max-h-full' lang = { currentLang }>
					<div
						className='p-5 max-sm:p-0 max-sm:h-full'
						dangerouslySetInnerHTML={ { __html: step === 'pp' ? dataPrivacyPolicy : dataTermConditions } }
					/>
				</ScrollableContentContainer>
			</div>
			<FooterSection className='rounded-[8px]'>
				{ renderFooterSection() }
			</FooterSection>
		</PrivacyPolicyContainer>
	</Modal>;
};

export default PrivacyPolicyModal;