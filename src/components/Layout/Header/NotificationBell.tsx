import { Modal, Text } from '@/components/ui';
import { colors, icons } from '@/constant';
import { UserSessionData } from '@/interface';
import { useNotification } from '@/lib/api/client/header';
import { useCurrentLocale } from '@/locales/client';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, PropsWithRef, useState } from 'react';

type Props = PropsWithRef<PropsWithChildren<{
  session: UserSessionData
}>>

const NotificationBell = ({ children, session }:Props) => {
	const [showNotification, setShowNotification] = useState<boolean>(false);
	const router = useRouter();
	const currentLang = useCurrentLocale();

	const {
		data: getNotification,
	} = useNotification({
		query: {
			medical_record: session?.user?.medical_record ?? '',
			email: session?.user?.email,
		},
	});

	const notificationResponseData = getNotification?.data;
	return (
		<>
			<div className='relative inline-block text-white my-auto' onClick={ () => {
				setShowNotification(true);
			} }>
				<icons.Notif onClick={ () => {
				// if (marAllReadNotifFunc) {
				// 	marAllReadNotifFunc()
				// 		.then(() => {
				// 			mutate('getNotification');
				// 		});
				// }
				} }
				className='cursor-pointer w-8 h-8 sm:w-11 sm:h-11'
				/>
				<span className='absolute -top-2 -right-1 w-[18px] h-[18px] sm:w-[22px] sm:h-[22px] flex items-center justify-center text-center flex-shrink-0 bg-[#EB5757] border-2 border-white rounded-full text-[10px] sm:text-xs text-white'>
					{ notificationResponseData?.total_unread ?? 0 }
				</span>
			</div>
			<Modal
				visible={ showNotification }
				onClose={ () => setShowNotification(false) }
				width='380px'
				noPadding={ true }
			>
				<div className='relative flex flex-col'>
					<div className='flex justify-between p-[20px]'>
						<Text
							fontSize='16px'
							lineHeight='24px'
							fontType='h3'
							fontWeight='700'
							textAlign='center'
							color={ colors.black.default }
							text='Notification'
						/>
					</div>

					{
						notificationResponseData?.notification?.map((item, idx) => (
							<div key={ idx } className='pb-4'>
								<div className='flex flex-col py-4 px-[20px]'
									onClick={ () => {
										setShowNotification(false);
										router.push(`${ item?.url }`);
									} }
									style={ {
										backgroundColor: item.flag === 0 ? 'rgba(53, 136, 136, 0.1)' : 'rgba(0, 0, 0, 0)'
									} }>
									<div className='flex justify-between'>
										<Text
											fontSize='12px'
											fontWeight={ item.flag === 0 ? '700' : '400' }
											textAlign='left'
											color={ colors.grey.pencil }
											text={ moment(item.create_datetime)?.format('DD MMM, hh:mm') }
										/>
									</div>
									<Text
										fontSize='14px'
										lineHeight='20px'
										fontWeight={ item.flag === 0 ? '700' : '400' }
										textAlign='left'
										color={ colors.black.default }
										text={ currentLang === 'id' ? item?.judul_idn : item?.judul_en }
										className='flex justify-start'
									/>
									<Text
										fontSize='12px'
										lineHeight='20px'
										fontWeight={ item.flag === 0 ? '700' : '400' }
										textAlign='left'
										color={ colors.black.default }
										text={ currentLang === 'id' ? item?.isi_idn : item?.isi_en }
										className='flex justify-start pt-2'
									/>
								</div>
							</div>
						))
					}
				</div>
			</Modal>
		</>
	);
};

export default NotificationBell;