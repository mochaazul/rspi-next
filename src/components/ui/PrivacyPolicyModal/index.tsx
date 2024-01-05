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
				<>
					<Checkbox name='pp' onChange={ onChecked } checked={ checkVals['pp'] } label={
						<Text
							fontSize='16px'
							fontWeight='400'
							lineHeight='20px'
						>
							{ languages('agreementStatement.preText') } <strong>{ languages('agreementStatement.boldText') }</strong> { languages('agreementStatement.tailText') }
						</Text>
					} />
					<Button label={ languages('buttonPrivacy') } disabled={ !checkVals['pp'] } onClick={ onNext }>
						{ loading ? <Spinner /> : languages('buttonPrivacy') }
					</Button>
				</>
			);
		}
		return (
			<>
				<Checkbox name='toc' onChange={ onChecked } checked={ checkVals['toc'] } label={
					<Text
						fontSize='16px'
						fontWeight='400'
						lineHeight='20px'
					>
						{ languages('agreementStatement.preText') } <strong>{ languages('agreementStatement.boldText') }</strong> { languages('agreementStatement.tailText') }
					</Text>
				} />
				<Button label={ languages('buttonTnC') } disabled={ !checkVals['toc'] || loading } onClick={ onNext }>
					{ loading ? <Spinner /> : languages('buttonTnC') }
				</Button>
			</>
		);

	};

	return <Modal visible={ isOpen } width='978px' noPadding onClose={ onClose }>
		<PrivacyPolicyContainer>
			<HeaderSection>
				<HeaderItem>
					<NumberContainer isActive={ step === 'pp' }>1</NumberContainer>
					<Text
						fontSize='20px'
						fontWeight='900'
						text='Privacy Policy'
						color={ step === 'pp' ? '#2A2536' : '#6A6D81' }
					/>
				</HeaderItem>
				<Divider />
				<HeaderItem>
					<NumberContainer isActive={ step === 'toc' }>2</NumberContainer>
					<Text
						fontSize='20px'
						fontWeight='900'
						text='Terms and Conditions'
						color={ step === 'toc' ? '#2A2536' : '#6A6D81' }
					/>
				</HeaderItem>
			</HeaderSection>
			<div className='px-[24px]'>
				<ScrollableContentContainer>
					<div
						className='p-5'
						dangerouslySetInnerHTML={ { __html: step === 'pp' ? dataPrivacyPolicy : dataTermConditions } }
					/>
				</ScrollableContentContainer>
			</div>
			<FooterSection >
				{ renderFooterSection() }
			</FooterSection>
		</PrivacyPolicyContainer>
	</Modal>;
};

export default PrivacyPolicyModal;