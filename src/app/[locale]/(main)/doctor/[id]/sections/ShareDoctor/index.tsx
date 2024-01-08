import { Text } from '@/components/ui';
import Images from '@/constant/images';
import { FindDoctorDetail, ResponseType } from '@/interface';
import { useGetDoctorDetail } from '@/lib/api/client/doctors';
import { useScopedI18n } from '@/locales/client';
import { useHostname } from '@/utils/useHostname';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import * as Icons from 'react-feather';

type ShareDoctorProps = {
	doctorDetail?: ResponseType<FindDoctorDetail>
} & React.HTMLAttributes<HTMLDivElement>

const ShareDoctor = (props: ShareDoctorProps) => {
	const t = useScopedI18n('page.doctorProfile.shareDoctor');
	const pathName = usePathname();
	const params = useParams();
	const hostname = useHostname({ fullUrl: true });

	const { data: doctor, isLoading, error: doctorError } = useGetDoctorDetail({ param: params.id as string });

	const handleOpenSocmed = (link: string) => () => {
		if (typeof window !== 'undefined') {
			window.open(link, '_blank');
		}
	};

	if (!doctor) return null;
	const shareMsg = encodeURIComponent(t('wateleMsg', { doctor_name: doctor.data.name, speciality: doctor.data.specialty[0], link: hostname }));
	return (
		<div className={ props.className }>
			<Text
				text={ 'Share This Doctor' }
				className='related lg:mt-[30px]  '
				fontWeight='900'
				fontSize='16px'
				lineHeight='24px'
			/>
			<div className='flex gap-[10px] mt-[20px] '>
				<div className='cursor-pointer' onClick={ handleOpenSocmed('https://www.facebook.com/RumahSakitPondokIndah') }>
					<Images.FacebookLogo
						width='16px'
						height='16px' />
				</div>
				<div className='cursor-pointer' onClick={ handleOpenSocmed('https://twitter.com/rspondokindah') }>
					<Images.TwitterLogo
						width='16px'
						height='16px' />
				</div>
				<div className='cursor-pointer' onClick={ handleOpenSocmed('https://www.linkedin.com/company/rumah-sakit-pondok-indah/') }>
					<Images.LinkedinLogo
						width='16px'
						height='16px'
					/>
				</div>
				<div className='cursor-pointer' onClick={ () => { navigator.clipboard.writeText(pathName); } }>
					<Icons.Link width='16px' height='16px' />
				</div>
				<div className='cursor-pointer' >
					<Link href={ `https://t.me/share/url?url=${hostname}&text=${shareMsg}` } target='_blank'>
						<Images.TelegramLogo
							width='16px'
							height='16px'
						/>
					</Link>
				</div>
				<div className='cursor-pointer'>
					<Link href={ `https://wa.me/send?text=${shareMsg}` } target='_blank'>
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