import React from 'react';
import * as Icons from 'react-feather';

import { colors } from '@/constant';

import { PillsStyle } from './style';

const Pills = ({ children, onRemove }: { children: React.ReactElement; onRemove?: () => any; }) => {
	return (
		<PillsStyle>
			<div>
				{ children }
			</div>
			<div className='cursor-pointer' onClick={ onRemove }>
				<Icons.X size={ 20 } color={ colors.grey.light } />
			</div>
		</PillsStyle>
	);
};

export default React.memo(Pills);