
import { ReactElement } from 'react';
import { I18nProviderClient } from '../../locales/client';
 
export default function SubLayout({ params: { locale }, children }: { params: { locale: string }, children: ReactElement }) {
	return (
		<html lang={ locale }>
			<body>
				{ children }
			</body>
		</html>
	);
}