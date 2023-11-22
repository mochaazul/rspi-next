'use client';
import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';

import { Text } from '@/components/ui';
import { colors } from '@/constant';

import { ItemStyle, MenuItemStyle } from './style';

interface PropsTypes {
	menuList: string[];
	children: React.ReactElement[];
}

const SubMenuPage = ({ menuList, children }: PropsTypes) => {
	const [activeIndex, setActiveIndex] = useState<number>(0);
	const [isMounted, setIsMounted] = useState<boolean>(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const mobileSubMenu = () => {
		return (
			<div className='flex flex-col w-full'>
				<div className='flex gap-4 mb-4'>
					{
						menuList?.map((menu, index) => (
							<MenuItemStyle
								key={ index }
								className={ `cursor-pointer bg-transparent px-1 py-4 border-b-2 ${ activeIndex === index ? 'active-mobile' : 'border-transparent' }` }
								onClick={ () => setActiveIndex(index) }
							>
								<Text
									fontWeight='700'
									lineHeight='19px'
									fontSize='16px'
									color={ activeIndex === index ? colors.green.brandAccent : colors.grey.darker }
									text={ menu }
								/>
							</MenuItemStyle>
						))
					}
				</div>
				<div className='flex-1 relative'>
					{
						children.map ?
							children.map((elem, index) => (
								<ItemStyle key={ index } className={ `${ activeIndex === index ? 'active' : '' } w-full` }>
									{ elem }
								</ItemStyle>
							)) :
							<ItemStyle className='active'>{ children }</ItemStyle>
					}
				</div>
			</div>
		);
	};

	const renderComponent = () => {
		if (!isMounted) return null;

		if (isMobile) return mobileSubMenu();

		return (
			<>
				<div className='mr-[100px]'>
					{
						menuList?.map((menu, index) => (
							<MenuItemStyle
								key={ index }
								className={ `cursor-pointer p-5 w-[286px] ${ activeIndex === index ? 'active' : '' }` }
								onClick={ () => setActiveIndex(index) }
							>
								<Text
									fontWeight='700'
									lineHeight='19px'
									fontSize='16px'
									color={ activeIndex === index ? colors.paradiso.default : colors.grey.darker }
									text={ menu }
								/>
							</MenuItemStyle>
						))
					}
				</div>
				<div className='flex-1 relative'>
					{
						children.map ? (
							<>
								{
									children.map((elem, index) => (
										<ItemStyle key={ index } className={ `${ activeIndex === index ? 'active' : '' }` }>
											{ elem }
										</ItemStyle>
									))
								}
							</>
						) :
							<ItemStyle className='active'>{ children }</ItemStyle>
					}
				</div>
			</>
		);
	};

	return renderComponent();
};

export default SubMenuPage;