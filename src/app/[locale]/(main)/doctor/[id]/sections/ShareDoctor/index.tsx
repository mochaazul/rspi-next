import Link from 'next/link';
import { useParams } from 'next/navigation';
import * as Icons from 'react-feather';

import Text from '@/components/ui/Text';
import Images from '@/constant/images';
import {
	facebookLink,
	linkedinLink,
	telegramLink,
	twitterLink,
	whatsappLink
} from '@/helpers/sharedLink';
import { FindDoctorDetail, ResponseType } from '@/interface';
import { useGetDoctorDetail } from '@/lib/api/client/doctors';
import { useScopedI18n } from '@/locales/client';
import { useHostname } from '@/utils/useHostname';

type ShareDoctorProps = {
	doctorDetail?: ResponseType<FindDoctorDetail>;
} & React.HTMLAttributes<HTMLDivElement>;

const ShareDoctor = (props: ShareDoctorProps) => {
	const t = useScopedI18n('page.doctorProfile.shareDoctor');
	const params = useParams();
	const hostname = useHostname({ fullUrl: true });

	const { data: doctor, isLoading, error: doctorError } = useGetDoctorDetail({ param: params.id as string });

	if (!doctor) return null;
	const shareMsg = t('wateleMsg', { doctor_name: doctor.data.name, speciality: doctor.data.specialty[0], link: hostname });
	const teleMsg = t('teleMsg', { doctor_name: doctor.data.name, speciality: doctor.data.specialty[0] });

	return (
		<div className={ props.className }>
			<Text
				text={ 'Share This Doctor' }
				className='related lg:mt-[30px]  '
				fontWeight='900'
				fontSize='16px'
				lineHeight='24px'
			/>
			<div className='flex items-center gap-[10px] mt-[20px] '>
				<div className='cursor-pointer'>
					<Link href={ facebookLink({ url: hostname }) } target='_blank'>
						<Images.FacebookLogo
							width='16px'
							height='16px' />
					</Link>
				</div>
				<div className='cursor-pointer'>
					<Link href={ twitterLink({ text: shareMsg }) } target='_blank'>
						<Images.XLogo
							width='16px'
							height='16px' />
					</Link>
				</div>
				<div className='cursor-pointer'>
					<Link href={ linkedinLink({ url: hostname, text: shareMsg }) } target='_blank'>
						<Images.LinkedinLogo
							width='16px'
							height='16px'
						/>
					</Link>
				</div>
				<div className='cursor-pointer' onClick={ () => navigator.clipboard.writeText(decodeURIComponent(shareMsg)).then(() => alert('Successfully copied')) }>
					<Icons.Link width='16px' height='16px' />
				</div>
				<div className='cursor-pointer' >
					<Link href={ telegramLink({ text: teleMsg, url: hostname }) } target='_blank'>
						<Images.TelegramLogo
							width='16px'
							height='16px'
						/>
					</Link>
				</div>
				<div className='cursor-pointer'>
					<Link href={ whatsappLink({ text: shareMsg, url: hostname }) } target='_blank'>
						<Images.WhatsappLogo
							width='16px'
							height='16px'
						/>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ShareDoctor;