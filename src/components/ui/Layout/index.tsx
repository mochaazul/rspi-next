import React from 'react';

import {
	OutletStyle,
	OutletStyleType,
	PanelH1,
	PanelH2,
	PanelH3,
	PanelH4,
	PanelV1
} from './style';

const Layout = (props: { containerStyle?: OutletStyleType; footerShow?: boolean; children?: any; }) => {
	return (
		<>
			<OutletStyle { ...props.containerStyle }>
				{ props.children }
			</OutletStyle>
		</>
	);
};

export default Object.assign(React.memo(Layout), {
	PanelH1: PanelH1,
	PanelH2: PanelH2,
	PanelH3: PanelH3,
	PanelH4: PanelH4,
	PanelV1: PanelV1
});