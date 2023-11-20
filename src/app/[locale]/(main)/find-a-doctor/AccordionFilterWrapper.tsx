import { Accordion } from '@/components/ui';

export const AccordionFilterWrapper = ({ title, children, hideToggler }: { title: string; children: React.ReactElement; hideToggler?: boolean; }) => (
	<div className='mt-4 sm:mt-12'>
		<Accordion
			openedIndex={ 0 }
			onlyOpenOne={ true }
			itemTheme={ itemType => <Accordion.ItemFilterMenu { ...itemType } hideTogler={ hideToggler } /> }
			datas={ [{
				title: title,
				desc: '',
				isJSXDesc: true,
				desc_jsx: children
			}] }
		/>
	</div>
);