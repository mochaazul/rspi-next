"use client";

import { useCallback, useEffect, useState } from 'react';

import Button from '@/components/Button';
import Modal from '@/components/Modal';
import Text from '@/components/Text';
// import { persistor } from 'stores';

const DevTools = () => {

	const [open, setOpen] = useState<boolean>(false);

	useEffect(() => {
		window.removeEventListener('keypress', handleKeyPress);
		window.addEventListener('keypress', handleKeyPress);
		return () => {
			window.removeEventListener('keypress', handleKeyPress);
		};
	}, [open]);

	const handleKeyPress = useCallback((evt: KeyboardEvent) => {
		if (evt.key === '`') {
			setOpen(!open);
		}
	}, [open]);

	const flushReduxPersist = () => {
		// persistor.purge();
		setOpen(false);
	};

	return <Modal
		visible={ open }
	>
		<div>
			<Text className='mb-2' text='Dev Tools' fontType={ 'h4' } />
			<Button onClick={ flushReduxPersist } className='mb-2'>Reset Redux</Button>
			<Button onClick={ () => setOpen(false) }>Close</Button>
		</div>
	</Modal>;
};

export default DevTools;
