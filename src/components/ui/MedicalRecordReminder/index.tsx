'use client';

// import { Tooltip } from 'react-tooltip';
import { useRouter } from 'next/navigation';
import isEmpty from 'lodash/isEmpty';

import { icons } from '@/constant';
import { useScopedI18n } from '@/locales/client';
import useSession from '@/session/client';

import {
	BgContainer,
	BodyContainer,
	FloatingContainer,
	FloatingWrapper,
	LeftContent
} from './style';

import Text from '../Text';
import Button from '../Button';

interface PropsType {
	isFloating?: boolean;
}

const MedicalRecordReminder = ({ isFloating = true }: PropsType) => {
	const session = useSession();
	const languages = useScopedI18n('page.medicalRecordReminder');
	const navigate = useRouter();

	const onClickOnboard = () => {
		setTimeout(() => {
			// navigate.push('/register-onboard'); Migrate
		}, 1000);
	};

	const renderContent = () => {
		return (
			<>
				<BgContainer>
					<div className='relative overflow-hidden rounded-tl-[10px]'>
						<icons.Circle />
					</div>
				</BgContainer>
				<BodyContainer
					className={ isFloating
						? 'grid grid-cols-[auto_140px] md:grid-cols-[auto_1fr] items-center gap-4 md:gap-11'
						: 'flex max-lg:flex-col lg:items-center lg:justify-between w-full gap-6 lg:gap-11' }
				>
					<LeftContent className={ isFloating ? 'items-end sm:items-center' : 'lg:items-center' }>
						<Text
							fontType={ null }
							fontWeight='700'
							className={ isFloating
								? 'max-sm:leading-[18px] !text-xs sm:text-sm md:text-base'
								: 'text-sm md:text-base' }
						>
							{ languages('heading') }
						</Text>
						<div className={ isFloating ? 'max-sm:mb-1' : 'max-lg:mt-1' }>
							<icons.ExclamationMark data-tooltip-place='top-end' data-tooltip-id='booking-tooltip' style={ { width: '24px' } } />
						</div>
					</LeftContent>
					<Button
						label={ languages('btnLabel') }
						onClick={ onClickOnboard }
						className={ `max-sm:p-[10px] ${ isFloating ? '!w-auto max-sm:text-[12px] max-md:text-sm' : 'w-full lg:w-auto max-md:text-sm' }` }
					/>
				</BodyContainer>
				{/* <Tooltip id='booking-tooltip' offset={ 24 } style={ { width: 300, padding: '12px', borderRadius: '5px' } }>
					<Text
						fontSize='12px'
						fontWeight='400'
						lineHeight='23px'
						color='white'
						text={ languages('tooltipLabel') }
					/>
				</Tooltip> */}
			</>
		);
	};

	const renderFloating = () => (
		<FloatingWrapper className='md:ml-5'>
			<FloatingContainer
				className='flex'
			>
				{ renderContent() }
			</FloatingContainer>
		</FloatingWrapper>
	);

	const renderMedicalRecordReminder = () => {
		if (isFloating) return renderFloating();

		return (
			<div className='relative flex bg-white shadow-[5px_5px_10px_0px_rgba(53,136,136,0.12)] rounded-[10px]'>
				{ renderContent() }
			</div>
		);
	};

	if (isEmpty(session?.token)) return null;

	if (!session?.user?.medical_record || !session?.user?.no_mr) return renderMedicalRecordReminder();

	return null;
};

export default MedicalRecordReminder;