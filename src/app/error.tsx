'use client';

import Link from 'next/link';

export default function ErrorPage() {
	const renderEmailSupport = () => {
		return (
			<span className='text-green-secondary'>
				<Link href='mailto:support@example.com' target='_blank' rel='noopener noreferrer'>support@example.com</Link>
			</span>
		);
	};

	return (
		<div className='bg-[#FAFAFA] min-h-screen py-5 flex justify-center items-center'>
			<div className='text-center max-w-[1110px] w-full mx-auto px-4'>
				<div className='text-gray-1 leading-normal flex flex-col gap-y-2 sm:gap-y-4 mb-5 sm:mb-[42px]'>
					<h1 className='text-6xl sm:text-8xl font-black'>500</h1>
					<h2 className='text-2xl sm:text-4xl'>Unknown Error</h2>
				</div>
				<div className='divide-y divide-gray-3 flex flex-col items-center gap-y-2 sm:gap-y-4 text-gray-2 text-base sm:text-xl sm:leading-[30px]'>
					<p>
						We apologize, but an internal server error occurred. Our team is addressing the issue. Please retry later. If the problem persists, feel free to contact our support team at { renderEmailSupport() } for further assistance.
						<br /><br />
						Thank you for your understanding.
					</p>
					<p className='pt-2 sm:pt-4'>
						Mohon maaf, terjadi kesalahan internal server. Tim kami sedang menangani masalah ini. Silakan coba lagi nanti. Jika masalah terus berlanjut, silakan hubungi tim dukungan kami di { renderEmailSupport() } untuk bantuan lebih lanjut.
						<br /><br />
						Terima kasih atas pengertian Anda.
					</p>
				</div>
			</div>
		</div>
	);
}