import React, { useEffect, useState } from 'react';
import * as Icons from 'react-feather';
import Image from 'next/image';

import { colors, icons } from '@/constant';
import { getLanguage, hasLanguageSet, setLanguage } from '@/helpers/localStorage';
import { Picker, Text } from '@/components';

const languageItem = [
	{
		key: 'id',
		label: 'ID',
		value: 'idn',
		longLabel: 'Bahasa Indonesia',
		icon: <icons.IDFlag className='w-5 h-5 flex-shrink-0 mr-3' />
	},
	{
		key: 'en',
		label: 'EN',
		value: 'en',
		longLabel: 'English',
		icon: <icons.ENFlag className='w-5 h-5 flex-shrink-0 mr-3' />
	}
];

const LanguageSelector = () => {

	const [currrentLang, setCurrentLang] = useState<string>();
	const [showLanguagePicker, setShowLanguagePicker] = useState<boolean>(false);

	useEffect(() => {
		// check if the language is set in local storage
		// hasLanguageSet(); // TODO: migrate
		// get language config from local storage, if null we gave it default value
		// (which is not necesarry since it was already handled by hasLanguageSet() function)
		// const lang = getLanguage() ?? 'idn'; // TODO: migrate
		// set local state language to localstorage value
		setCurrentLang('idn'); // TODO: migrate
	}, []);

	const onChangeLanguage = (value: string) => {
		// setLanguage(value); // TODO: migrate
		setCurrentLang(value);
		setShowLanguagePicker(false);
		// We need to reload the page to change all the content language since the header of the request is changed
		// this is the common approach used by many sites for changing the language
		// reload(); // TODO: migrate
	};

	// TODO: migrate
	// const reload = () => {
	// 	window.location.reload();
	// };

	return <>
		<div className='flex h-[21px]'>
			{ languageItem.find(item => currrentLang === item.value)?.icon }
		</div>
		<div className='flex items-center gap-[5px] cursor-pointer' onClick={ () => setShowLanguagePicker(!showLanguagePicker) }>
			<Text fontSize='16px' fontWeight='900' color='white'>
				{ languageItem.find(item => currrentLang === item.value)?.label }
			</Text>
			<icons.LightArrowDown />
			<div className='absolute right-0 top-10'>
				<Picker show={ showLanguagePicker } className='!mt-0 !shadow-[0px_4px_10px_0px_rgba(0,0,0,0.15)]'>
					{
						languageItem.map((item, index) => (
							<div
								key={ index }
								className={ `cursor-pointer p-5 ${ index > 0 ? 'border-t border-[#F0F2F9]' : '' }` }
								onClick={ () => onChangeLanguage(item.value) }
							>
								<Text
									fontSize='16px'
									fontWeight='700'
									lineHeight='19px'
									color={ item.value === currrentLang ? colors.green.brandAccent : colors.black.general }
									text={ item.longLabel }
								/>
							</div>
						))
					}
				</Picker>
			</div>
		</div>
	</>;
};

export default React.memo(LanguageSelector);