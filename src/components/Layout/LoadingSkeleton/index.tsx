import { PropsWithChildren, PropsWithRef } from 'react';

type Props = PropsWithRef<PropsWithChildren<{
  type?: 'line' | 'block' | 'content' | 'card-result'
}>>

const LoadingSkeleton = ({ type, children }:Props) => {
  
	if (type === 'content') {
		return (
			<div role='status' className='animate-pulse'>
				<div className='h-2.5 bg-gray-200 rounded-lg dark:bg-gray-700 w-48 mb-4' />
				<div className='h-2 bg-gray-200 rounded-lg dark:bg-gray-700 max-w-full mb-2.5' />
				<div className='h-2 bg-gray-200 rounded-lg dark:bg-gray-700 mb-2.5' />
				<div className='h-2 bg-gray-200 rounded-lg dark:bg-gray-700 max-w-full mb-2.5' />
				<div className='h-2 bg-gray-200 rounded-lg dark:bg-gray-700 max-w-full mb-2.5' />
				<div className='h-2 bg-gray-200 rounded-lg dark:bg-gray-700 max-w-full' />
			</div>
		);
	}

	if (type === 'line') {
		return (
			<div role='status' className='animate-pulse'>
				<div className='h-5 bg-gray-200 rounded-lg dark:bg-gray-700 w-48 mb-4' />
				<div className='h-5 bg-gray-200 rounded-lg dark:bg-gray-700 max-w-full mb-2.5' />
			</div>
		);
	}

	if (type === 'card-result') {
		<div role='status' className='w-full animate-pulse'>
			<div className='h-24 bg-gray-200 rounded-lg dark:bg-gray-700 w-full mb-4' />
		</div>;
	}

	return (
		<div role='status' className='animate-pulse'>
			<div className='h-20 bg-gray-200 rounded-lg dark:bg-gray-700 w-48 mb-4' />
		</div>
	);
};

export default LoadingSkeleton;