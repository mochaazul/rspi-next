'use client';
import { Modal, Text } from '@/components/ui';
import { colors, icons } from '@/constant';
import { UserSessionData } from '@/interface';
import { useNotification } from '@/lib/api/client/header';
import { markAllAsReadClient } from '@/lib/api/client/notification';
import { useCurrentLocale } from '@/locales/client';
import { Popover, Transition } from '@headlessui/react';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { Fragment, PropsWithChildren, PropsWithRef, useState } from 'react';
import { useSWRConfig } from 'swr';

type Props = PropsWithRef<PropsWithChildren<{
  session: UserSessionData
}>>

const NotificationBell = ({ children, session }:Props) => {
	const router = useRouter();
	const currentLang = useCurrentLocale();
	const { mutate } = useSWRConfig();

	const {
		data: getNotification,
	} = useNotification({
		query: {
			medical_record: session?.user?.medical_record ?? '',
			email: session?.user?.email,
		},
	});
	const markAllAsRead = async() => {
		await markAllAsReadClient({
			query: { medical_record: session.user?.medical_record ?? '',
				email: session.user?.email, }
		});
		mutate('getNotification');
	};

	const notificationResponseData = getNotification?.data;
	
	return (
		<>
			<Popover className='relative'>
				<div>
					<Popover.Button
						onClick={ markAllAsRead }
						className='flex items-center justify-center relative w-full focus:ring-0 focus:outline-none'>
						<icons.Notif className='w-8 h-8 sm:w-11 sm:h-11 flex-shrink-0' />
						<span className='absolute -top-2 -right-1 w-[18px] h-[18px] sm:w-[22px] sm:h-[22px] flex items-center justify-center text-center flex-shrink-0 bg-[#EB5757] border-2 border-white rounded-full text-[10px] sm:text-xs text-white'>
							{ notificationResponseData?.total_unread ?? 0 }
						</span>
					</Popover.Button>
				</div>

				<Transition
					as={ Fragment }
					enter='transition ease-out duration-100'
					enterFrom='transform opacity-0 scale-95'
					enterTo='transform opacity-100 scale-100'
					leave='transition ease-in duration-75'
					leaveFrom='transform opacity-100 scale-100'
					leaveTo='transform opacity-0 scale-95'
				>
					<Popover.Panel className='absolute z-[999] right-0 mt-4 lg:mt-5 w-screen max-w-[calc(100vw-92px)] sm:max-w-[400px] origin-top-right shadow-[0px_4px_10px_0px_rgba(0,0,0,0.15)] overflow-hidden bg-white rounded-b-[10px] font-Lato'>
						<div className='flex flex-col gap-2'>
							<div className='flex p-3'>
								<Text
									fontSize='16px'
									lineHeight='24px'
									fontType='h3'
									fontWeight='700'
									color={ colors.black.ink }
									text='Notification'
								/>
							</div>

							<div className='max-h-[50vh] overflow-y-auto custom-scrollbar flex flex-col gap-y-2 px-3 pb-3'>
								{
									notificationResponseData?.notification?.map((item, idx) => (
										<div
											key={ idx }
											className={ `flex flex-col gap-y-2 p-3 rounded-lg cursor-pointer hover:bg-green-secondary/10 ${ item.flag === 0 ? 'bg-green-secondary/10' : '' }` }
											onClick={ () => {
												if (item?.url) {
													router.push(`${ item?.url }`);
												}
											} }
										>
											<Text
												fontSize='12px'
												fontWeight='400'
												color={ colors.grey.pencil }
												text={ moment(item.create_datetime)?.format('DD MMM, hh:mm A') }
											/>
											<Text
												fontSize='14px'
												lineHeight='20px'
												fontWeight='700'
												color={ colors.black.ink }
												text={ currentLang === 'id' ? item?.judul_idn : item?.judul_en }
											/>
											<Text
												fontSize='12px'
												lineHeight='20px'
												fontWeight='400'
												color={ colors.black.ink }
												text={ currentLang === 'id' ? item?.isi_idn : item?.isi_en }
											/>
										</div>
									))
								}
							</div>

						</div>
					</Popover.Panel>
				</Transition>
			</Popover>
		</>
	);
};

export default NotificationBell;