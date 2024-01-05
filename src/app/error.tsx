'use client';

export default function ErrorPage() {
	return (
		<div className='bg-[#FAFAFA] min-h-screen py-6 sm:py-5 flex justify-center items-center'>
			<div className='text-center max-w-[1110px] w-full mx-auto px-4 flex flex-col gap-y-5 sm:gap-y-[42px]'>
				<div className='text-gray-1 leading-normal flex flex-col gap-y-2 sm:gap-y-4'>
					<h1 className='text-6xl sm:text-8xl font-black'>500</h1>
					<h2 className='text-2xl sm:text-4xl'>Unknown Error</h2>
				</div>
				<div className='divide-y divide-[#EAEAEA] flex flex-col items-center gap-y-2 sm:gap-y-4 text-gray-2 text-base sm:text-xl sm:leading-[30px]'>
					<p>
						We apologize, but an internal server error occurred. Our team is addressing the issue. Please retry later. If the problem persists, feel free to contact our support team. Thank you for your understanding.
					</p>
					<p className='pt-2 sm:pt-4'>
						Mohon maaf, terjadi kesalahan internal server. Tim kami sedang menangani masalah ini. Silakan coba lagi nanti. Jika masalah terus berlanjut, silakan hubungi tim dukungan kami. Terima kasih atas pengertian Anda.
					</p>
				</div>
				<div className='rounded-[10px] p-4 flex max-md:flex-col items-center justify-between gap-2 w-full bg-white shadow-[5px_5px_10px_0px_rgba(53,136,136,0.12)] text-base sm:text-xl sm:leading-[30px] text-gray-2'>
					<span className="flex flex-wrap justify-center gap-1">RSPI - Pondok Indah <span className='text-green-secondary'>021-765 7525</span></span>
					<span className="flex flex-wrap justify-center gap-1">RSPI - Puri Indah <span className='text-green-secondary'>021-2569 5200</span></span>
					<span className='flex flex-wrap justify-center gap-1'>RSPI - Binatro Jaya <span className='text-green-secondary'>021-8082 8888</span></span>
				</div>
			</div>
		</div>
	);
}