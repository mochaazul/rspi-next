'use client';
import React, { useState } from 'react';

import { Text } from '@/components/ui';
import { colors } from '@/constant';

import { ItemStyle, MenuItemStyle } from './style';

interface PropsTypes {
	menuList: string[];
	children: React.ReactElement[];
}

const SubMenuPage = ({ menuList, children }: PropsTypes) => {
	const [activeIndex, setActiveIndex] = useState<number>(0);

	const mobileSubMenu = () => {
		return (
			<div className='flex flex-col w-full lg:hidden'>
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
		return (
			<>
				{ mobileSubMenu() }
				<div className='hidden lg:flex w-full divide-x divide-[#F0F2F9]'>
					<div className='divide-y divide-[#F0F2F9]'>
						{
							menuList?.map((menu, index) => (
								<MenuItemStyle
									key={ index }
									className={ ` group/menuItemPatient cursor-pointer p-5 w-[286px] ${ activeIndex === index ? 'active' : '' }` }
									onClick={ () => setActiveIndex(index) }
								>
									<Text
										fontWeight='700'
										lineHeight='19px'
										fontSize='16px'
										color={ activeIndex === index ? colors.paradiso.default : colors.grey.darker }
										text={ menu }
										subClassName='group-hover/menuItemPatient:text-green-secondary '
									/>
								</MenuItemStyle>
							))
						}
					</div>
					<div className='flex-1 relative lg:pl-20 xl:pl-[100px]'>
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
				</div>
			</>
		);
	};

	return renderComponent();
};

export default SubMenuPage;