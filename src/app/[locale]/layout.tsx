
import { ReactElement } from 'react';
 
export default function SubLayout({ params: { locale }, children }: { params: { locale: string }, children: ReactElement }) {
	return (
		<html lang={ locale }>
			<body>
				{ children }
			</body>
		</html>
	);
}