'use client';
import { AwardsDetail } from '@/interface';
import { AccreditationsAwardsWrapper } from './style';
import Text from '@/components/ui/Text';
import { colors } from '@/constant';
import Button from '@/components/ui/Button';
import { useScopedI18n } from '@/locales/client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const AccreditationAwards = ({ datas }: { datas: AwardsDetail[]; }) => {
	const t = useScopedI18n('page.landingPage.accreditationsAndAwards');
	const router = useRouter();

	return (
		<AccreditationsAwardsWrapper className='px-3 md:px-40 mt-12 w-full'>
			<Text
				fontSize='44px'
				fontType='h1'
				fontWeight='900'
				lineHeight='57px'
				text={ t('heading') }
				subClassName='sm:text-center max-sm:text-[24px]'
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

			<div className='flex md:flex-row flex-col mt-9'>
				{
					datas?.map((data, index) => (
						<div key={ index } className='md:flex-1 sm:px-5 sm:py-3 card-shadow'>
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
			<div className='sm:mt-16 mt-6 sm:max-w-fit max-w-full m-auto'>
				<Button theme='secondary' $hoverTheme='primary' className='px-[40px] max-sm:text-[14px]' onClick={ () => router.push('/accreditation-and-awards') }>
					{ t('readMoreBtnLabel') }
				</Button>
			</div>
		</AccreditationsAwardsWrapper>
	);
};

export default AccreditationAwards;