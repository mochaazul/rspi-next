'use client';
import { AwardsDetail } from '@/interface';
import { AccreditationsAwardsWrapper } from './style';
import Text from '@/components/ui/Text';
import { colors } from '@/constant';
import Button from '@/components/ui/Button';
import { useScopedI18n } from '@/locales/client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

const AccreditationAwards = ({ datas }: { datas: AwardsDetail[]; }) => {
	const t = useScopedI18n('page.landingPage.accreditationsAndAwards');
	const router = useRouter();

	return (
		<AccreditationsAwardsWrapper className='container-page w-full'>
			<Text
				fontSize='44px'
				fontType='h2'
				fontWeight='900'
				lineHeight='57px'
				text={ t('heading') }
				subClassName='sm:text-center heading-section'
			/>
			<Text
				fontSize='20px'
				fontType='p'
				fontWeight='400'
				lineHeight='30px'
				color={ colors.grey.dark }
				subClassName='sm:text-center'
				className='mt-4 sm:max-w-[930px] m-auto'
			>
				{ t('subHeading') }
			</Text>

			<div className='grid grid-cols-2 lg:flex gap-y-8 gap-x-6 lg:gap-x-5 mt-6 sm:mt-[50px]'>
				{
					datas?.slice(0, 4)?.map((data, index) => (
						<div key={ index } className='card-shadow w-full lg:p-3 flex-1'>
							<div className='image'>
								{ data.img_url && (
									<Image src={ data.img_url } alt={ data.title ?? 'rspi-awards' } width={ 120 } height={ 120 } />
								) }
							</div>
							<div>
								<Text
									fontSize='20px'
									fontWeight='900'
									lineHeight='30px'
									text={ data.title }
									subClassName='text-center'
								/>
							</div>
						</div>
					))
				}
			</div>
			<div className='sm:mt-[60px] mt-6 sm:max-w-fit max-w-full m-auto'>
				<Link href={ '/accreditation-and-awards' }>
					<Button theme='secondary' $hoverTheme='primary' className='sm:px-10 leading-normal py-2 sm:py-3 max-sm:text-[14px]'>
						{ t('readMoreBtnLabel') }
					</Button>
				</Link>
			</div>
		</AccreditationsAwardsWrapper>
	);
};

export default AccreditationAwards;