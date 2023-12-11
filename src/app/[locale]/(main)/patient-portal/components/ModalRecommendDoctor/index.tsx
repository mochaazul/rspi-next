'use client';

import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import styled from 'styled-components';
import { isEmpty } from 'lodash';

import { Modal, Text, Button, Spinner } from '@/components/ui';
import { Images, colors, icons } from '@/constant';
import { I_VisitHistory, } from '@/interface/PatientProfile';
import { usePostDoctorRatingMutation } from '@/lib/api/client/doctors';
import { useScopedI18n } from '@/locales/client';

import { ModalStyle } from '../../style';
import Image from 'next/image';

interface PropsType {
	visible?: boolean;
	onClose?: () => void;
	id?: string;
	visitHistory?: I_VisitHistory;
}

const feedbackPills = [
	{ label: 'Communication', value: '1' },
	{ label: 'Professionalism', value: '2' },
	{ label: 'Attitude', value: '3' },
	{ label: 'Skill', value: '4' },
	{ label: 'Timely', value: '5' },
	{ label: 'Knowledge', value: '6' }
];

const Rating = ({ onChange, value }: { value: string, onChange: (value: string) => void; }) => {
	const t = useScopedI18n('page.patientPortal.riwayatKunjungan.recommendDoctorModal.rating');

	const options = Array.from({ length: 10 }, (_, i) => i + 1);

	return (<div>
		<RadioGroup className='flex justify-between' value={ value } onChange={ onChange }>
			{
				options.map((opt, index) => (
					<RadioGroup.Option value={ opt } key={ index }>
						{ ({ checked }) => (
							<RatingOptionLabel checked={ checked }>{ opt }</RatingOptionLabel>
						) }
					</RadioGroup.Option>
				))
			}
		</RadioGroup>
		<div className='flex justify-between mt-[8px]'>
			<Text text={ t('0') }
				fontSize='12px'
				fontWeight='400'
				color='#6A6D81'
			/>
			<Text text={ t('1') }
				fontSize='12px'
				fontWeight='400'
				color='#6A6D81'
			/>
		</div>
	</div>);
};

const Feedback = ({ onChange, value, valueRating }: { valueRating: string, value: string[], onChange: (value: string[]) => void; }) => {
	const t = useScopedI18n('page.patientPortal.riwayatKunjungan.recommendDoctorModal.feedback');

	const onChecked = (optValue: string) => {
		const isChecked = value.includes(optValue);
		if (isChecked) {
			onChange(value.filter(item => item !== optValue));
		} else {
			onChange([...value, optValue]);
		}
	};

	const isChecked = (optValue: string) => {
		return value.includes(optValue);
	};

	return (<div className='mt-[32px]'>
		<Text text={ parseInt(valueRating) > 8 ? t('headingLove') : t('headingImprove') } fontSize='20px' fontWeight='700' lineHeight='30px' color={ '#2A2536' } />
		<div className='flex	flex-wrap gap-[11px] mt-[32px]'>
			{
				feedbackPills.map((opt, index) => (
					<FeedbackPills checked={ isChecked(opt.value) } key={ index } onClick={ () => { onChecked(opt.value); } }>
						<Text
							fontSize='16px'
							fontWeight={ isChecked(opt.value) ? '900' : '500' }
							color={ isChecked(opt.value) ? '#358888' : '#2A2536' }
							text={ opt.label } />
						{ isChecked(opt.value)
							? <Image alt='' src='/images/ic/check-active.svg' width={ 16 } height={ 16 } />
							: <FeedbackPillsCheck /> }
					</FeedbackPills>
				))
			}
		</div>
	</div>);
};

const FeedbackNotes = ({ onChange, value }: { value: string, onChange: (value: string) => void; }) => {
	const t = useScopedI18n('page.patientPortal.riwayatKunjungan.recommendDoctorModal.feedback');

	return (
		<div className='mt-[32px] '>
			<div className='flex gap-[6px] mb-[6px]'>
				<Text text={ t('notesInputLabel') }
					fontSize='14px'
					fontWeight='500'
					lineHeight='20px' />

			</div>
			<StyledTextArea placeholder={ t('notesInputPlaceholder') } value={ value } onChange={ evt => {
				onChange(evt.target.value);
			} } />
			<Text text={ t('smallNotes') }
				fontSize='14px'
				fontWeight='500'
				lineHeight='20px'
				color='#6A6D81'
			/>
		</div>
	);
};

const RecommendDoctorModal = (props: PropsType) => {
	const t = useScopedI18n('page.patientPortal');

	const { data: giveDoctorRatingResponse, trigger: giveDoctorRating, error: giveDoctorRatingError, isMutating: giveDoctorRatingLoading } = usePostDoctorRatingMutation();
	const [showSuccessReview, setShowSuccessReview] = useState<boolean>(false);
	const [showSuccessStatus, setShowSuccessStatus] = useState<string>('');
	const [ratingValue, setRatingValue] = useState<string>('');
	const [feedbackValue, setFeedbackValue] = useState<string[]>([]);
	const [feedbackNotes, setFeedbackNotes] = useState<string>('');

	const onSubmit = async () => {

		if (props?.visitHistory) {
			await giveDoctorRating({
				appointment_id: props.visitHistory.appointment_id,
				doctor_code: props.visitHistory.doctor_code,
				question_1: `${ ratingValue }`,
				question_2: feedbackValue,
				question_3: feedbackNotes,
				username: 'Rebelworks'
			}).then(res => {
				setShowSuccessReview(true);
				setShowSuccessStatus(res.stat_msg ?? '');
				props.onClose && props.onClose();
				resetForm();
			});

		}
	};

	const renderModalReview = () => {
		return (
			<Modal
				visible={ showSuccessReview }
				onClose={ () => setShowSuccessReview(false) }
				noPadding
			>
				<div className='py-3 sm:py-4 px-6 sm:px-10 flex flex-col items-center gap-y-3'>
					<div className='flex-shrink-0'>
						{ showSuccessStatus === 'Success' ? <icons.Confirmed className='w-10 h-10 sm:w-12 sm:h-12' /> : <icons.Close className='w-10 h-10 sm:w-12 sm:h-12' /> }
					</div>

					<Text
						fontSize='16px'
						lineHeight='24px'
						fontWeight='700'
					>
						{ t('riwayatKunjungan.recommendDoctorModal.feedback.responReview') }
						{ showSuccessStatus === 'Success'
							? t('riwayatKunjungan.recommendDoctorModal.feedback.responReviewSuccess')
							: t('riwayatKunjungan.recommendDoctorModal.feedback.responReviewFailed')
						}
					</Text>
				</div>
			</Modal>
		);
	};

	const resetForm = () => {
		setRatingValue('');
		setFeedbackValue([]);
		setFeedbackNotes('');
	};

	const shouldDisable = () => {
		return isEmpty(feedbackValue) || !ratingValue || giveDoctorRatingLoading || isEmpty(feedbackNotes);
	};

	return (
		<>
			<Modal
				visible={ props.visible }
				onClose={ props.onClose }
				width='520px'
				noPadding={ true }
			>
				<ModalStyle className='max-sm:p-4'>
					<div>
						<Text text={ t('riwayatKunjungan.recommendDoctorModal.header') } fontSize='20px' fontWeight='700' lineHeight='30px' color={ '#2A2536' } />
						<div className='flex my-[30px] p-[16px] rounded-md bg-[#FAFAFA]'>
							<div><img className='rounded-full h-[48px] w-[48px]' src={ props.visitHistory?.doctor_photo || Images.Doctor1.src } /></div>
							<div className='ml-[15px]'>
								<Text text={ props.visitHistory?.doctor_name ?? '-' } fontSize='16px' fontWeight='700' />
								<Text text={ props.visitHistory?.doctor_specialty } className='mt-[10px]' fontSize='14px' fontWeight='400' color={ colors.grey.darkOpacity } />
							</div>
						</div>
						<Rating onChange={ setRatingValue } value={ ratingValue } />
						<Feedback value={ feedbackValue } onChange={ setFeedbackValue } valueRating = { ratingValue } />
						<FeedbackNotes value={ feedbackNotes } onChange={ setFeedbackNotes } />
						<Button label='Submit' className='mt-[32px]' onClick={ onSubmit } disabled={ shouldDisable() }>
							{
								giveDoctorRatingLoading && <Spinner />
							}
						</Button>
					</div>
				</ModalStyle>
			</Modal>
			{ renderModalReview() }
		</>
	);
};

const RatingOptionLabel = styled.div<{ checked: boolean; }>`
  border-radius: 5px;
  border: 1px solid #EAEAEA;
  display: flex;
	padding: 7px 13px;
	@media screen and (max-width: 640px) {
		padding: 4px 8px;
  }
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
  ${ props => props.checked && `
    background-color: #358888;
    color: white;
  `}
`;

const FeedbackPillsCheck = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid #D4D2D8;
  border-radius: 99999px;
`;

const FeedbackPills = styled.div<{ checked: boolean; }>`
  user-select: none;
  border-radius: 100px;
  background: #F2F2F2;
  display: flex;
  padding: 8px 16px;
  align-items: center;
  gap: 16px;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
  ${ props => props.checked && `
    border: 1px solid var(--Secondary-Green, #358888);
    background: #E5F5F5;
  `}
  transition: 100ms all;
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  min-height: 150px;
  border: 1px solid #D0D5DD;
  border-radius: 8px;
  padding: 10px 14px;
  outline: none;
  font-size: 16px;
  margin-bottom: 6px;
  line-height: 24px;
  :active{
  }

`;

export default RecommendDoctorModal;