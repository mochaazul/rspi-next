import React, { useEffect, useState } from 'react';
import * as Icons from 'react-feather';
import Image from 'next/image';

import { icons } from '@/constant';
import { Picker, Text } from '@/components';
import { useChangeLocale, useCurrentLocale } from '@/locales/client';

const languageItem = [
	{
		key: 'id',
		label: 'ID',
		value: 'id',
		icon: <Image src={ icons.IDFlag } alt="" className='mr-[20px] h-[20px]' />
	},
	{
		key: 'en',
		label: 'EN',
		value: 'en',
		icon: <Image src={ icons.ENFlag } alt="" className='mr-[20px] h-[20px]' />
	}
];

const LanguageSelector = () => {

	const setLanguage = useChangeLocale();
	const currentLang = useCurrentLocale();
	
	const [showLanguagePicker, setShowLanguagePicker] = useState<boolean>(false);

	const onChangeLanguage = (value: any) => {
		setLanguage(value);
		setShowLanguagePicker(false);
	};

	return <>
		<div className='flex items-center gap-[20px]'>
			{ languageItem.find(item => currentLang === item.value)?.icon }
		</div>
		<div className='flex items-center pl-[20px] gap-[8px] cursor-pointer' onClick={ () => setShowLanguagePicker(!showLanguagePicker) }>
			<Text fontSize='16px' fontWeight='900' color='white'>
				{ languageItem.find(item => currentLang === item.value)?.label }
			</Text>
			<Image
				src={ icons.LightArrowDown }
				alt=""
			/>
			<div className='absolute right-[-10px] top-7'>
				<Picker show={ showLanguagePicker }>
					{
						languageItem.map((item, index) => (
							<div
								key={ index }
								className={ `cursor-pointer border-gray block py-4 px-4 flex justify-between items-center ${ index < languageItem.length ? '' : 'border-b' } ${ item.value === currentLang ? 'active' : '' }` }
								onClick={ () => onChangeLanguage(item.value) }
							>
								<>
									{ item.icon }
									<Text
										fontSize='16px'
										fontWeight='700'
										lineHeight='19px'
										text={ item.label }
										className='flex-1'
									/>
								</>
								<Icons.Check className={ `check-icon ${ item.value === currentLang ? '' : 'hidden' }` } size={ 20 } />
							</div>
						))
					}
				</Picker>
			</div>
		</div>

	</>;
};

export default React.memo(LanguageSelector);