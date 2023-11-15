import { History } from '@/helpers';
import { useRouter } from 'next/navigation';

export const NavigationSetter = () => {
	History.navigate = useRouter();
	return null;
};
