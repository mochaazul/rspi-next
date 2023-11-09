import moment from 'moment';
import Image from 'next/image';
import { Button, Modal, Text } from '@/components';
import { icons, Languages as lang } from '@/constant';
import { SuccessConfModalContainer } from './style';
import 'moment/locale/id';
import { Link } from 'react-router-dom';
import { getLanguage } from '@/helpers/localStorage';

type Props = {
	doctorName?: string;
	hospitalName?: string;
	date?: string;
	visible: boolean;
};

const language = lang.page.doctorProfile;

const SuccessConfirmationModal = ({
	date,
	doctorName,
	hospitalName,
	visible
}: Props) => {
	return <Modal visible={ visible }
		noPadding
		width='526px'
		containerClassName='mx-[10px]'
		borderRadius='12px'
	>
		<SuccessConfModalContainer>
			<Image
				src={icons.CheckShadowed}
				alt="" />
			<Text
				className='mt-[24px]'
				fontSize='24px'
				fontWeight='700'
				lineheight='28px'
				text={ language.successTitle } />
			<Text
				className='mt-[8px] mb-[32px]'
				fontSize='14px'
				fontWeight='400'
				lineheight='20px'
				textAlign='center'
				text={ `${ language.successBody } Dr. ${ doctorName ?? '' } ${ language.in } ${ hospitalName } ${ language.at } ${ date && moment(date).locale(getLanguage() === 'idn' ? 'id' : 'en')
					.format('dddd, DD MMM YYYY') } ${ language.hasSuccess }` } />
			<Link to={ '/patient-portal' }>
				<Button label='Oke' />
			</Link>
		</SuccessConfModalContainer>
	</Modal>;
};

export default SuccessConfirmationModal;