import { RadioGroup } from '@headlessui/react';
import { Modal, Text, Button, Spinner } from '@/components';
import { Images, Languages, colors, icons } from '@/constant';
import { useAppDispatch, useTypedSelector } from '@/hooks';
import { useAppAsyncDispatch } from '@/hooks/useAppDispatch';
import { GiveRatingDoctorPayload, I_VisitHistory, PatientProfile, PatientState } from '@/interface/PatientProfile';
import { isEmpty } from 'lodash';

import { ModalStyle } from 'pages/PatientPortal/style';
import { useState } from 'react';
import { giveDoctorRating } from '@/stores/PatientProfile';
import styled from 'styled-components';
import Image from 'next/image';

interface PropsType {
	visible?: boolean;
	onClose?: () => void;
	id?: string;
	visitHistory?: I_VisitHistory;
}
const { jadwalKunjungan, riwayatKunjungan: {
	recommendDoctorModal: {
		header
	}
} } = Languages.page.patientPortal;

const feedbackPills = ['Communication', 'Proffesionalism', 'Attitude', 'Skill', 'Timely', 'Knowledge'];

const RatingOptionLabel = styled.div<{ checked: boolean; }>`
  border-radius: 5px;
  border: 1px solid #EAEAEA;
  display: flex;
  padding: 7px 13px;
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

const Rating = ({ onChange, value }: { value: string, onChange: (value: string) => void; }) => {
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
			<Text text='Highly not recommend'
				fontSize='12px'
				fontWeight='400'
				color='#6A6D81'
			/>
			<Text text='Highly recommend'
				fontSize='12px'
				fontWeight='400'
				color='#6A6D81'
			/>
		</div>
	</div>);
};

const Feedback = ({ onChange, value }: { value: string[], onChange: (value: string[]) => void; }) => {

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
		<Text text={ 'What do you love about your doctor?' } fontSize='20px' fontWeight='700' lineHeight='30px' color={ '#2A2536' } />
		<div className='flex	flex-wrap gap-[11px] mt-[32px]'>
			{
				feedbackPills.map((opt, index) => (
					<FeedbackPills checked={ isChecked(opt) } key={ index } onClick={ () => { onChecked(opt); } }>
						<Text
							fontSize='16px'
							fontWeight={ isChecked(opt) ? '900' : '500' }
							color={ isChecked(opt) ? '#358888' : '#2A2536' }
							text={ opt } />
						{ isChecked(opt)
							? <Image src={icons.CheckActive} alt="" />
							: <FeedbackPillsCheck /> }
					</FeedbackPills>
				))
			}
		</div>
	</div>);
};

const FeedbackNotes = ({ onChange, value }: { value: string, onChange: (value: string) => void; }) => {
	return (
		<div className='mt-[32px] '>
			<div className='flex gap-[6px] mb-[6px]'>
				<Text text='Tell us more'
					fontSize='14px'
					fontWeight='500'
					lineHeight='20px' />
				<Text text='(Optional)'
					fontSize='14px'
					fontWeight='500'
					lineHeight='20px'
					color='#6A6D81'
				/>
			</div>
			<StyledTextArea placeholder='Enter a description...' value={ value } onChange={ evt => {
				onChange(evt.target.value);
			} } />
			<Text text='This would help us to keep improving our service.'
				fontSize='14px'
				fontWeight='500'
				lineHeight='20px'
				color='#6A6D81'
			/>
		</div>
	);
};

const RecommendDoctorModal = (props: PropsType) => {

	const giveRatingDispatch = useAppAsyncDispatch<GiveRatingDoctorPayload>(giveDoctorRating);
	const { loading, error } = useTypedSelector<PatientState>('patient');

	const [ratingValue, setRatingValue] = useState<string>('');
	const [feedbackValue, setFeedbackValue] = useState<string[]>([]);
	const [feedbackNotes, setFeedbackNotes] = useState<string>('');

	const onSubmit = async () => {
		if (props.visitHistory) {
			await giveRatingDispatch({
				id: props.visitHistory.appointment_id,
				payload: {
					doctor_code: props.visitHistory.doctor_code,
					question_1: `${ ratingValue }`,
					question_2: feedbackValue,
					question_3: feedbackNotes,
					username: 'RSPI-WebPortal'
				}
			});
			props.onClose && props.onClose();
		}
	};

	const shouldDisable = () => {
		return isEmpty(feedbackValue) || !ratingValue || loading;
	};

	return (
		<Modal
			visible={ props.visible }
			onClose={ props.onClose }
			width='520px'
			noPadding={ true }
		>
			<ModalStyle>
				<div>
					<Text text={ header } fontSize='20px' fontWeight='700' lineHeight='30px' color={ '#2A2536' } />
					<div className='flex my-[30px] p-[16px] rounded-md bg-[#FAFAFA]'>
						<div><img className='rounded-full h-[48px] w-[48px]' src={ props.visitHistory?.doctor_photo || Images.Doctor1 } /></div>
						<div className='ml-[15px]'>
							<Text text={ props.visitHistory?.doctor_name ?? '-' } fontSize='16px' fontWeight='700' />
							<Text text={ props.visitHistory?.doctor_specialty } className='mt-[10px]' fontSize='14px' fontWeight='400' color={ colors.grey.darkOpacity } />
						</div>
					</div>
					<Rating onChange={ setRatingValue } value={ ratingValue } />
					<Feedback value={ feedbackValue } onChange={ setFeedbackValue } />
					<FeedbackNotes value={ feedbackNotes } onChange={ setFeedbackNotes } />
					<Button label='Submit' className='mt-[32px]' onClick={ onSubmit } disabled={ shouldDisable() }>
						{
							loading && <Spinner />
						}
					</Button>
				</div>
			</ModalStyle>
		</Modal>
	);
};

export default RecommendDoctorModal;