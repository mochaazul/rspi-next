import Modal from '@/components/Modal';
import {
	Divider, FooterSection, HeaderItem, HeaderSection, NumberContainer, PrivacyPolicyContainer, ScrollableContentContainer
} from './style';
import Text from '@/components/Text';
import { ChangeEvent, ChangeEventHandler, useState } from 'react';
import loremipsum from 'pages/RegisterOnboard/loremipsum';
import Checkbox from '@/components/Checkbox';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/Spinner';

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
	const navigate = useRouter();
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
			// navigate('/otp-verification');
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
							lineheight='20px'
						>
							Saya <strong>menyetujui</strong> ketentuan Privacy Policy.
						</Text>
					} />
					<Button label='Lanjut' disabled={ !checkVals['pp'] } onClick={ onNext }>
						{ loading ? <Spinner /> : 'Lanjut' }
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
						lineheight='20px'
					>
						Saya <strong>menyetujui</strong> ketentuan Terms and Condition.
					</Text>
				} />
				<Button label='Lanjut' disabled={ !checkVals['toc'] || loading } onClick={ onNext }>
					{ loading ? <Spinner /> : 'Lanjut' }
				</Button>
			</>
		);

	};

	return <Modal visible={ isOpen } width='678px' noPadding onClose={ onClose }>
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
				<Text
					fontSize='14px'
					fontWeight='400'
					text='Updated 25 July 2019'
					color={ '#6A6D81' }
					className='mb-[16px]'
				/>
				<ScrollableContentContainer>
					{ loremipsum }
				</ScrollableContentContainer>
			</div>
			<FooterSection >
				{ renderFooterSection() }
			</FooterSection>
		</PrivacyPolicyContainer>
	</Modal>;
};

export default PrivacyPolicyModal;