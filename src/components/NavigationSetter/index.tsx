import { History } from '@/helpers';
import { useNavigate } from 'react-router-dom';

export const NavigationSetter = () => {
	History.navigate = useNavigate();
	return null;
};
