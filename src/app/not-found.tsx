import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
	title: 'Not Found',
	description: 'Something went wrong',
};

export default function NotFound() {
	return (
		<main>
			<section className='bg-[#F8FCFC]'>
				<div className='flex min-h-screen flex-col items-center justify-center text-center w-full max-w-[538px] mx-auto px-4'>
					<h1 className='text-gray-1 font-black text-6xl sm:text-8xl leading-normal'>404</h1>
					<h2 className='mt-2 sm:mt-4 text-2xl sm:text-4xl leading-normal text-gray-2'>Page Not Found</h2>
					<Link href='/' className='mt-12 bg-green-secondary rounded-[5px] py-[13px] px-10 w-full text-white text-base font-black leading-normal hover:bg-opacity-90'>Back to home</Link>
				</div>
			</section>
		</main>
	);
}
