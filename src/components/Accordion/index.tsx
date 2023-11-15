import React, { useEffect, useState } from 'react';

import Item from './Item';
import ItemFAQ from './ItemFAQ';
import ItemFilterMenu from './ItemFilterMenu';
import { AccordionStyle } from './style';

export interface ItemType {
	index?: number;
	title: string;
	desc: string;
	desc_jsx?: React.ReactNode;
	readMore?: boolean;
	onlyOpenOne?: boolean;
	isOpen?: boolean;
	onOpen?: () => any;
	isJSXDesc?: boolean;
	hideTogler?: boolean
}

export interface AccordionType {
	datas: ItemType[];
	itemTheme?: (props: ItemType) => JSX.Element;
	onlyOpenOne?: boolean;
	onOpenIndex?: (index: number) => any;
	openedIndex?: number;
	hideItemBorderBottom?: boolean;
	itemWrapperClassname?: string;
	hideTogler?: boolean
}

/**
 * This Part will act as a Facade for Accordion item
 * @param props AccordionType
 * @returns JSX.Element
 */
const Accordion = (props: AccordionType) => {
	const ItemTheme = props.itemTheme ?? Item;

	const [openIndex, setOpenIndex] = useState(0);

	const handleOnOpen = (index: number) => () => {
		setOpenIndex(index);
		props.onOpenIndex?.(index);
	};

	useEffect(() => {
		if (props.openedIndex !== undefined && props.openedIndex !== openIndex) {
			setOpenIndex(props.openedIndex);
		}
	}, [props.openedIndex]);

	return (
		<AccordionStyle>
			{
				props?.datas?.map((data, key) =>
					<div key={ key } className={ `item-wrapper ${ (key + 1) !== props.datas.length && !(!!props.hideItemBorderBottom) ? 'border-bottom' : '' } ${ props.itemWrapperClassname }` }>
						<ItemTheme
							index={ key }
							isOpen={ openIndex === key }
							onlyOpenOne={ props.onlyOpenOne }
							onOpen={ handleOnOpen(key) }
							{ ...data }
						/>
					</div>
				)
			}
		</AccordionStyle>
	);
};

export default Object.assign(React.memo(Accordion), {
	Item,
	ItemFAQ,
	ItemFilterMenu
});