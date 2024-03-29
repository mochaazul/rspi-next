export default {
	combobox: {
		notFound: 'Data tidak ditemukan',
		loading: 'Sedang memuat...',
	},
	dayName: {
		full: {
			monday: 'Senin',
			tuesday: 'Selasa',
			wednesday: 'Rabu',
			thursday: 'Kamis',
			friday: 'Jumat',
			saturday: 'Sabtu',
			sunday: 'Minggu',
			all: 'Semua'
		},
		short: {
			monday: 'Sen',
			tuesday: 'Sel',
			wednesday: 'Rab',
			thursday: 'Kam',
			friday: 'Jum',
			saturday: 'Sab',
			sunday: 'Min',
			all: 'Semua'
		}
	},
	global: {
		callAmbulanceLabel: {
			heading: 'Panggil Ambulans',
			subHeading: 'Silahkan pilih Rumah sakit: '
		},
		share: 'Bagikan',
		emptyData: 'Yah! Belum ada {label} saat ini'
	},
	blacklist: {
		contactUs: 'Hubungi kami',
	},
	gender: {
		male: 'Laki-laki',
		female: 'Perempuan'
	},

	unsubscribe: {
		headingSuccess: 'Berhasil Berhenti Belangganan',
		subHeadingSuccess: 'Berhenti berlangganan berita terbaru tentang RSPI berhasil, semoga kita bisa bertemu kembali',
		headingFailed: 'Gagal Berhenti Belangganan',
		subHeadingFailed: 'Berhenti berlangganan berita terbaru tentang RSPI gagal, silahkan coba lagi',
	},
	modalDialog: {
		pin: {
			header: 'Masukkan PIN',
			subHeader: 'Silahkan masukan PIN untuk melanjutkan.',
			submitBtnLabel: 'Konfirmasi',
			pinLabel: 'PIN',
			forgotPin: 'Lupa PIN?',
			labelSuccess1: 'Mohon periksa email Anda',
			labelSuccess2: 'untuk memverifikasi permintaan ubah PIN',
			modalPinTitle: 'Link Verifikasi Ubah PIN Terkirim',
			modalPinBtn: 'Oke'
		},
		needLogin: {
			heading: 'Silakan Login',
			subHeading: 'Untuk mengakses halaman ini perlu login terlebih dahulu.',
			btnLabel: 'Login'
		},
		needLogout: {
			heading: 'Akses masuk terdeteksi!',
			subHeading: 'Terdapat akses baru yang masuk ke akun Anda pada perangkat lain.',
			desc: 'Silahkan log out secara manual.',
			btnLabel: 'Log Out'
		}
	},
	navMenu: {
		home: 'Beranda',
		ourHospitals: 'Rumah Sakit Kami',
		centreOfExcellence: 'Center of Excellence',
		facility: 'Fasilitas dan Layanan',
		career: 'Karir',
		findDoctor: 'Cari Dokter',
		login: 'Masuk',
		register: 'Daftar',
		contactUs: 'Hubungi Kami',
		loginRegister: 'Masuk / Daftar',
		bookAppointment: 'Buat Janji Temu',
		user: {
			patientPortal: 'Portal Pasien',
			patientInformation: 'Informasi Pasien',
			logout: 'Keluar'
		},
		logoutSuccess: 'Anda berhasil logout'
	},
	validation: {
		emailFormat: 'Email format salah',
		tokenValidation: {
			failed: 'Validasi Gagal',
			success: 'Validasi Berhasil',
			loading: 'Mohon Tunggu Sebentar',
			backToLogin: 'Kembali ke halaman login'
		},
		formValidation: {
			required: '{label} wajib diisi',
			emailNotValid: 'Format email tidak valid',
			phoneNotValid: 'Format telp tidak valid',
			minLength: '{label} minimum terdiri dari {minLength} karakter',
			minCapitalize: '{label} minimum terdiri dari {minCapitalize} huruf kapital',
			exactLength: '{label} harus terdiri dari {length} karakter',
			notMatch: '{label} tidak sesuai',
			fileNotValid: 'File tidak valid atau tidak didukung',
			maxFileSize: 'File lebih besar dari {maxFileSize}',
			prefixPhoneNotValid: 'No. telp harus diawali dengan +62 atau 021 atau 08 lalu diikuti dengan no. telp'
		}
	},
	page: {
		bookingAppointment: {
			heading: 'Buat Janji Temu',
			validationError: 'Mohon isi semua data.',
			profileSelector: {
				deleteModal: {
					heading: 'Apakah anda yakin ingin menghapus profil',
					yesLabel: 'Ya',
					noLabel: 'Tidak'
				},
				selfLabel: 'Diri sendiri :',
				other: 'Orang lain :',
				form: {
					selfHeading: 'Tambah profil diri sendiri',
					otherHeading: 'Tambah profil orang lain',
					name: 'Nama',
					email: 'E-Mail',
					phone: 'No Hp',
					gender: 'Jenis Kelamin',
					submit: 'Simpan',
					dob: 'Tanggal Lahir',
					genderLabel: {
						male: 'Laki-laki',
						female: 'Perempuan'
					}
				},
				emptyOther: 'Belum ada data orang lain',
				emptySelf: 'Data diri Kosong',
				addProfileLabelOnEmpty: 'Tambahkan',
				addNewProfile: 'Tambahkan Profile baru'
			},
			form: {
				selfInsurance: 'Pribadi',
				thirdPartyInsurance: 'Asuransi',
				complaintLabel: 'Keluhan utama saat ini?',
				guarantor: 'Pilih Penjamin',
				insuranceName: 'Nama Asuransi',
				insuranceNumber: 'Nomor Asuransi',
				insuranceCard: {
					label: 'Foto Kartu Asuransi (Opsional)',
					front: 'Upload foto tampak depan',
					back: 'Upload foto tampak belakang',
				},
				disclaimer: 'Disclaimer : Data yang diberikan adalah benar. Pendaftaran dilakukan untuk diri sendiri. Jika pendaftaran dilakukan untuk orang lain, sudah mendapatkan persetujuan dari pihak terkait',
				errorEmptyData: 'Pastikan Data Keluhan dan Penjamin Terisi',
				btnLabel: {
					back: 'Kembali',
					submit: 'Buat Janji Temu'
				}
			},
			confirmationModal: {
				heading: 'Konfirmasi Booking Appointment',
				subHeading: 'Silahkan periksa dan konfirmasi kebenaran informasi berikut: ',
				insuranceDataLabel: 'Data Asuransi',
				insuranceNumber: 'Nomor Asuransi',
				patientDetail: {
					heading: 'Data Pasien',
					name: 'Nama',
					birthDate: 'Tanggal lahir',
					phone: 'Nomor HP',
					email: 'E-Mail',
					guarantor: 'Penjamin'
				},
				toc: 'Saya menyatakan bahwa seluruh data diatas sudah benar.',
				confirmBtnLabel: 'Konfirmasi',
				profileIncompleteMsg: 'Terdapat Data Diri yang Belum Lengkap',
				redirectLabel: 'Silahkan klik tombol di bawah ini untuk diarahkan ke halaman profil',
				redirectBtnLabel: 'Menuju Halaman Profil'
			},
			success: {
				heading: 'Form telah berhasil dikirim!',
				subHeading: {
					main: 'Pembuatan janji temu anda dengan',
					at: 'di',
					on: 'pada',
					done: 'telah berhasil.'
				},
				btnLabel: 'Oke'
			}
		},
		unsubscribe: {
			headingSuccess: 'Berhasil Berhenti Belangganan',
			subHeadingSuccess: 'Berhenti berlangganan berita terbaru tentang RSPI berhasil, semoga kita bisa bertemu kembali',
			headingFailed: 'Gagal Berhenti Belangganan',
			subHeadingFailed: 'Berhenti berlangganan berita terbaru tentang RSPI gagal, silahkan coba lagi',
		},
		awards: {
			heading: 'Accreditations & Awards',
			subHeading: 'Kami berkomitmen untuk menjadi organisasi perawatan kesehatan pilihan kelas dunia. Kami sangat percaya bahwa keunggulan operasional dan keselamatan pasien merupakan bagian integral dalam memenuhi dan melampaui harapan pelanggan kami.'
		},
		centerOfExcellence: {
			heading: 'Center Of Excellence',
			serviceLocation: {
				heading: 'Layanan ini tersedia di',
				hospitalName: 'RS Pondok Indah - Pondok Indah Lantai 1',
				floor: 'Lantai',
				appointmentHeading: 'Perjanjian',
				phoneNumberHeading: 'Telepon',
				operationalHourHeading: 'Jam Operasional Patient Relations',
				informationHeading: 'Informasi',
				emailHeading: 'Email',
				relatedArticle: 'Artikel Terkait',
				readMore: 'Baca Selengkapnya'
			}
		},
		contactUs: {
			heading: 'Hubungi Kami',
			subHeading: 'Mohon lengkapi data diri Anda dan tuliskan pertanyaan atau permintaan Anda dalam formulir di bawah ini. Unit Patient Relations kami akan segera membantu Anda.',
			contactForm: {
				heading: 'Hubungi Kami',
				subHeading: 'Mohon lengkapi data diri Anda dan tuliskan pertanyaan atau permintaan Anda dalam formulir di bawah ini.',
				labels: {
					hospital: 'Hospital',
					fullName: 'Nama lengkap',
					gender: 'Gender',
					email: 'E-mail',
					phone: 'No. Handphone',
					subject: 'Subyek',
					notes: 'Pesan'
				},
				placeholder: {
					hospital: 'Hospital',
					fullName: 'Nama lengkap',
					gender: 'Gender',
					email: 'E-mail',
					phone: 'No. Handphone',
					subject: 'Subject',
					notes: 'Masukan pesan disini...'
				},
				submitBtnLabel: 'Kirim Pesan',
				form: {
					allHospitalLabel: 'Seluruh Cabang RSPI'
				},
				genderOptionsLabel: {
					male: 'Laki-laki',
					female: 'Perempuan'
				},
				titleOptionsLabel: {
					general: 'Pertanyaan Umum',
					specific: 'Pertanyaan Khusus'
				},
				errorSubmit: 'Submit form hubungi kami telah gagal',
				successSubmit: 'Submit form hubungi kami telah berhasil',
				handleButtonModalSubmit: 'Tutup',
			},
			faq: {
				contactUsLabel: 'Hubungi Kami',
				faqLongLabel: 'Pertanyaan Umum',
				readMoreLabel: 'Baca Selengkapnya',
				heading: 'FAQ',
				subHeading: 'Pertanyaan yang sering ditanyakan mengenai layanan di unit RS Pondok Indah',
				allFaqBtnLabel: 'Lihat Semua FAQ',
				questions: {
					doctorSchedule: 'Di mana saya dapat mengetahui jadwal praktik dokter?',
					assurance: 'Apakah asuransi saya dapat digunakan di RS Pondok Indah?',
					visitHours: 'Apakah ada jam besuk pasien di RS Pondok Indah?',
					checkUp: 'Bagaimana saya membuat perjanjian untuk Health Check-Up?',
					travelVaccine: 'Apakah RS Pondok Indah memiliki layanan vaksinasi perjalanan?',
					telemedicine: 'Apakah tersedia layanan Telemedicine/konsultasi jarak jauh di RS Pondok Indah?',
					maternity: 'Apakah ada informasi terkait persalinan di RS Pondok Indah?'
				},
				answers: {
					doctorSchedule: 'Anda dapat melihat jadwal praktik seluruh dokter RS Pondok Indah Group melalui laman (link) yang juga dapat diakses melalui RSPI Mobile (mobile apps) kami.',
					assurance: 'RS Pondok Indah Group telah bekerja sama dengan berbagai asuransi terpercaya, baik di dalam maupun luar negeri. Untuk melihat asuransi yang bermitra dengan kami, Anda dapat mengakses laman (link: perusahaan asuransi mitra).',
					visitHours: `Waktu kunjungan setiap unit perawatan dapat berbeda. Untuk menjaga ketenangan dan kenyamanan seluruh pasien kami, kunjungan hanya dapat dilakukan pada jam tertentu dan dilakukan secara bergantian.
					<div className='mt-[15px]' />
					<b>Waktu Berkunjung</b>
					<div className='mt-[15px]' />
					Kamar Rawat Inap Umum & Melihat Bayi
					<div className='flex'>
						<div className='flex flex-col'>
							<div>Siang: 11.00 – 13.00 WIB </div>
							<div>Sore: 18.00 – 20.00 WIB</div>
						</div>
					</div>
					<div className='mt-[15px]' />
					ICU, ICCU
					<div className='flex'>
						<div className='flex flex-col'>
							<div>Siang: 11.00 – 12.00 WIB </div>
							<div>Sore: 18.00 – 19.00 WIB </div>
						</div>
					</div>
					Hanya diperbolehkan 1 orang pada satu waktu.
					Anak-anak tidak diperbolehkan berada di unit ini 
					<div className='mt-[15px]' />
					Ruang NICU & Intermediate Bayi
					<div className='flex'>
						<div className='flex flex-col'>
							<div>Siang: 11.00 – 13.00 WIB</div>
							<div>Sore: 18.00 – 20.00 WIB </div>
						</div>
					</div>
					Hanya orang tua yang diizinkan berkunjung.
					Maksimum 2 orang untuk setiap pasien, diizinkan untuk berkunjung di waktu yang sama. `,
					checkUp: `
					<p className='gap-1'>Pemeriksaan kesehatan atau medical check up lengkap tersedia di ketiga cabang RS Pondok Indah Group. Kami menghadirkan berbagai paket medical check up, termasuk pemeriksaan kesehatan untuk anak. Silakan berkonsultasi dengan tim kami untuk mengetahui paket yang sesuai dengan kebutuhan Anda.</p>
					<div className='mt-[15px]' />
					<p className='gap-1 mb-3'>Untuk informasi lebih lanjut atau membuat perjanjian, silakan menghubungi:</p>
					<b>Executive Health Check Up RS Pondok Indah - Pondok Indah</b>
					<div className='flex'>
						<div className='flex flex-col xxl:w-[50%] md:w-[75%] w-full gap-1'>
							<div>Informasi & Perjanjian:</div>
							<div>(62-21) 7507169, 765 7525 Ext. 2267/2318</div>
							<div>WhatsApp:</div>
							<div><a href='https://api.whatsapp.com/send?phone=6281283112725' target='_blank'>0812-8311-2725</a></div>
							<div><i>E-mail:</i></div>
							<div><a href='mailto:hcupondok@rspondokindah.co.id' target='_blank'>hcupondok@rspondokindah.co.id</a></div>
							<a href='https://www.rspondokindah.co.id/uploads/ngc_global_posts/F30021-20230307125551.pdf'>[Paket HCU - RSPI Pondok Indah]</a>
						</div>
					</div>
					<div className='mt-[15px] mb-3' />
					<b>Executive Health Check Up RS Pondok Indah - Puri Indah</b>
					<div className='flex'>
						<div className='flex flex-col xxl:w-[50%] md:w-[75%] w-full gap-1'>
							<div>Informasi & Perjanjian:</div>
							<div>(62-21) 2569 5252, 2569 5200 Ext. 2100</div>
							<div>WhatsApp:</div>
							<div><a href='https://api.whatsapp.com/send?phone=6282180887838' target='_blank'>0821-8088-7838</a></div>
							<div><i>E-mail:</i></div>
							<div><a href='mailto:hcupondok@rspondokindah.co.id'>hcupuri@rspondokindah.co.id</a></div>
							<a href='https://www.rspondokindah.co.id/uploads/ngc_global_posts/Z81201-20230307125040.pdf'>[Paket EHCU - RSPI Puri Indah]</a>
						</div>
					</div>
					<div className='mt-[15px] mb-3' />
					<b>Executive Health Check Up RS Pondok Indah - Bintaro Jaya</b>
					<div className='flex'>
						<div className='flex flex-col xxl:w-[50%] md:w-[75%] w-full gap-1'>
							<div>Informasi & Perjanjian:</div>
							<div>(62-21) 8082 8888 Ext. 2301/2302</div>
							<div>WhatsApp:</div>
							<div><a href='https://api.whatsapp.com/send?phone=628119227982' target='_blank'>0811-9227-982</a></div>
							<div><i>E-mail:</i></div>
							<div><a href='mailto:hcubintaro@rspondokindah.co.id'>hcubintaro@rspondokindah.co.id</a></div>
							<a href='https://www.rspondokindah.co.id/uploads/ngc_global_posts/M37594-20220330105057.pdf'>[Paket EHCU - RSPI Puri Indah]</a>
						</div>
					</div>`,
					travelVaccine: `<p className='gap-1'>RS Pondok Indah memiliki layanan vaksinasi perjalanan. Kami juga melayani penerbitan sertifikat vaksinasi internasional atau &quot;buku kuning&quot;.</p>
					<div className='mt-[15px] mb-3' />
					<p className='mb-3'>Untuk informasi lebih lanjut, silakan menghubungi:</p>
					<b>Executive Health Check Up RS Pondok Indah - Pondok Indah</b>
					<div className='flex'>
						<div className='flex flex-col xxl:w-[50%] md:w-[75%] w-full gap-1'>
							<div>Informasi & Perjanjian:</div>
							<div>(62-21) 7507169, 765 7525 Ext. 2267/2318</div>
							<div>WhatsApp:</div>
							<div><a href='https://api.whatsapp.com/send?phone=6281283112725' target='_blank'>0812-8311-2725</a></div>
							<div><i>E-mail:</i></div>
							<div><a href='mailto:hcupondok@rspondokindah.co.id'>hcupondok@rspondokindah.co.id</a></div>
						</div>
					</div>
					<div className='mt-[15px] mb-3' />
					<b>Executive Health Check Up RS Pondok Indah - Puri Indah</b>
					<div className='flex'>
						<div className='flex flex-col xxl:w-[50%] md:w-[75%] w-full gap-1'>
							<div>Informasi & Perjanjian:</div>
							<div>(62-21) 2569 5252, 2569 5200 Ext. 2100</div>
							<div>WhatsApp:</div>
							<div><a href='https://api.whatsapp.com/send?phone=6282180887838' target='_blank'>0821-8088-7838</a></div>
							<div><i>E-mail:</i></div>
							<div><a href='mailto:hcupuri@rspondokindah.co.id'>hcupuri@rspondokindah.co.id</a></div>
						</div>
					</div>
					<div className='mt-[15px] mb-3' />
					<b>Executive Health Check Up RS Pondok Indah - Bintaro Jaya</b>
					<div className='flex'>
						<div className='flex flex-col xxl:w-[50%] md:w-[75%] w-full gap-1'>
							<div>Informasi & Perjanjian:</div>
							<div>(62-21) 8082 8888 Ext. 2301/2302</div>
							<div>WhatsApp:</div>
							<div><a href='https://api.whatsapp.com/send?phone=628119227982' target='_blank'>0811-9227-982</a></div>
							<div><i>E-mail:</i></div>
							<div><a href='mailto:hcubintaro@rspondokindah.co.id'>hcubintaro@rspondokindah.co.id</a></div>
						</div>
					</div>`,
					telemedicine: `<p className='gap-1'>RS Pondok Indah Group memiliki layanan konsultasi jarak jauh, atau telemedicine. Kini, Anda dapat berkonsultasi dengan dokter kami melalui video call dengan lebih nyaman. Layanan ini menggunakan aplikasi Zoom, di perangkat gadget Anda, sehingga Anda tidak perlu keluar rumah untuk berkonsultasi dengan dokter kami.</p>
					<div className='mt-[15px] mb-3' />
					<h3 className='mb-3'>Mekanisme Telemedicine RS Pondok Indah Group</h3>
					<ol className='list-decimal pl-4'>
						<li>Pastikan Anda sudah menjadi pasien RS Pondok Indah Group dan memiliki nomor rekam medis</li>
						<li>Hubungi Call Center RS Pondok Indah yang Anda tuju untuk mendaftar dan/atau mengecek jadwal praktik dokter kami yang menyediakan layanan telemedicine</li>
						<li>Klik <a href='#'>link</a> yang kami kirimkan <a href='#'>melalui nomor WhatsApp Anda</a> untuk memulai sesi konsultasi pada waktu yang ditetapkan</li>
						<li>Selesaikan langkah administrasi yang kami kirimkan ke <a href='#'>email</a> Anda</li>
						<li>Layanan Telemedicine ini hanya dapat dilakukan dengan sistem pembayaran pribadi (<a href='#'>self-paid</a>) melalui transfer bank. Kami belum dapat menerima pembayaran dengan asuransi ataupun pembayaran dengan kartu kredit/debit</li>
						<li>Apabila dokter meresepkan obat atau meminta pemeriksaan darah untuk Anda, Anda dapat mengambil obat dan melakukan pengambilan darah secara drive-thru pada waktu yang ditentukan setelah Anda menyelesaikan administrasi. Kami juga melayani pengantaran obat ke rumah pasien untuk wilayah tertentu</li>
					</ol>`,
					maternity: `Menanti kehadiran sang buah hati merupakan momen perjalanan hidup yang istimewa dan sangat berharga bagi Anda dan pasangan. Memahami hal tersebut, RS Pondok Indah Group menghadirkan Maternity First, yaitu layanan kehamilan yang lengkap dan terpadu, untuk menciptakan pengalaman terbaik menyambut sang buah hati sejak masa kehamilan, melahirkan, dan pasca persalinan, meliputi:
					<div className='mt-[15px]' />

					<ul className='list-disc pl-5'>
						<li>Tenaga medis profesional, termasuk dokter spesialis kebidanan dan kandungan, dokter spesialis kebidanan dan kandungan konsultan fetomaternal, dokter spesialis anak, dan dokter konselor laktasi</li>
						<li>Maternity Counselor yang dapat dihubungi via WhatsApp 24 jam untuk membantu menjawab pertanyaan ibu selama menjalani masa kehamilan</li>
						<li>Fasilitas dan teknologi medis terkini, seperti USG 4D</li>
						<li>Five-stars facilities di ruang perawatan, ruang bersalin, kamar operasi, ruang bayi termasuk fasilitas NICU</li>
						<li>100% dukungan untuk IMD (Inisiasi Menyusu Dini) dan pemberian ASI eksklusif</li>
						<li>Maternity Classes meliputi kelas senam hamil, prenatal Yoga, dan parenting class</li>
					</ul>

					<div className='mt-[15px]' />
					<p>Untuk informasi lebih lanjut, silakan menghubungi:</p>
					<div className='mt-[15px]' />
					<p>RS Pondok Indah – Pondok Indah</p>
					<p>Klinik Kebidanan dan Kandungan Lantai 3</p>
					<p>(021) 765 7525 Ext. 2</p>
					<p>Maternity Counselor (WhatsApp chat only): 081388887273</p>

					<div className='mt-[15px]' />
					<p>RS Pondok Indah - Puri Indah</p>
					<p>Klinik Kebidanan dan Kandungan Lantai 7</p>
					<p>(021) 2569 5200 Ext. 2</p>
					<p>Maternity Counselor (WhatsApp chat only): 081388889096</p>

					<div className='mt-[15px]' />
					<p>RS Pondok Indah – Bintaro Jaya</p>
					<p>Klinik Kebidanan dan Kandungan Lantai 6</p>
					<p>(021) 8082 8888 Ext. 2/6012</p>
					<p>Maternity Counselor (WhatsApp chat only): 081295998870</p>`
				}
			},
			location: {
				heading: 'Our Hospital',
				subHeading: 'Memberikan pelayanan terdepan dengan dukungan tenaga medis profesional, adopsi teknologi medis terkini, serta sistem informasi digital yang terintegrasi. Kenali lebih dalam di sini.',
			}
		},
		landingPage: {
			services: {
				tabsLabel: ['Cari Dokter'],
				findDoctor: {
					form: {
						notFoundSpeciality: 'Tidak ditemukan data',
						resetBtnLabel: 'Reset',
						submitBtnLabel: 'Cari Dokter',
						allHospital: 'Seluruh Cabang RSPI',
						labels: {
							doctorName: 'Nama Dokter',
							hospital: 'Rumah Sakit',
							speciality: 'Spesialisasi',
							date: 'Pilihan Hari'
						},
						placeholder: {
							doctorName: 'Nama Dokter',
							hospital: 'Seluruh Cabang RSPI',
							speciality: 'Spesialis',
							date: 'Pilih Tanggal',
						}
					}
				},
				telemedicine: {
					form: {
						resetBtnLabel: 'Reset',
						submitBtnLabel: 'Cari Dokter',
						labels: {
							doctorName: 'Nama Dokter (Telemedicine)',
							hospital: 'Hospital',
							speciality: 'Speciality',
							date: 'Pilihan Hari'
						},
						placeholder: {
							doctorName: 'Nama Dokter',
							hospital: 'Seluruh Cabang RSPI',
							speciality: 'Speciality',
						}
					}
				}
			},
			centerOfExcelence: {
				heading: 'Center of Excellence',
				subHeading: 'Telusuri lebih lanjut berbagai informasi seputar layanan kami, di sini.',
				allItemBtnLabel: 'Lihat Semua Center of Excellence',
				cardItem: {
					readMoreLabel: 'Baca Selengkapnya'
				},
				createAppointmentBtnLabel: 'Buat Janji Temu'
			},
			facilitiesServices: {
				heading: 'Fasilitas & Layanan',
				subHeading: 'Menyediakan pelayanan kesehatan terdepan yang terintegrasi. Dengan dukungan tenaga medis profesional, adopsi teknologi medis terkini, serta sistem informasi digital yang lebih efisien. Ketahui lebih lanjut, di sini.',
				allItemlabel: 'Lihat Semua Fasilitas & Layanan'
			},
			promoPackages: {
				heading: 'Promo dan Paket',
				subHeading: 'Berbagai penawaran istimewa untuk anda.',
				viewDetailsBtnLabel: 'Lihat Detail',
				allItemBtnLabel: 'Lihat Semua Promo dan Paket',
			},
			newsHealthArticle: {
				heading: 'Berita, Artikel & Majalah Kesehatan',
				allItemBtnLabel: 'Lihat Semua Berita & Artikel Kesehatan',
				readMoreBtnLabel: 'Baca Selengkapnya'
			},
			customerReview: {
				heading: 'Kisah Inspiratif dari Para Pasien kami',
				allPpatientHistoryBtnLabel: 'Baca Semua Patient Story'
			},
			accreditationsAndAwards: {
				heading: 'Akreditasi & Penghargaan',
				subHeading: 'Berbagai pencapaian terbaik kami sebagai wujud komitmen untuk selalu memberikan pelayanan kesehatan terbaik, mengutamakan keselamatan dan kenyamanan Anda.',
				readMoreBtnLabel: 'Lihat Penghargaan Kami Selengkapnya'
			},
			mobileAppBanner: {
				heading: 'Akses Pelayanan Kami Dari Ponsel Anda.',
				subHeading: 'Inilah aplikasi RSPI Mobile. Aplikasi terintegrasi untuk memudahkan Anda mengakses layanan kami. Segala informasi tentang layanan kami ada di sini'
			}
		},
		promoPage: {
			heading: 'Promo & Paket',
			hospitalSelectionLabel: 'Pilih lokasi rumah sakit',
			allHospitalLabel: 'Seluruh Cabang RSPI',
			tabPillsLabel: {
				allLabel: 'All',
				eventLabel: 'Events',
				classesLabel: 'Classes',
				promoLabel: 'Promo'
			},
			promoItem: {
				detailsBtnLabel: 'Lihat Detail'
			},
			schedule: 'Jadwal',
			more: 'Lihat Promo & Paket Lebih Banyak',
			info: 'Informasi',
			phone: 'Telepon (Whatsapp Only)',
			operational: 'Jam Operasional',
		},
		facilities: {
			heading: 'Fasilitas & Layanan',
			relatedNewsHeading: 'Berita Terkait',
			relatedDoctorsHeading: 'Dokter Terkait',
			facilitiesMenu: {
				servicesLocationHeading: 'Layanan ini tersedia di',
				phoneHeading: 'Telepon',
				informationHeading: 'Informasi',
				emailHeading: 'Email',
				operationalHourHeading: 'Jam Operasional Patient Relations',
			},
			readMoreLabel: 'Baca Selengkapnya',
			medicalSpecialities: {
				heading: 'Medical Specialities',
				content: 'Kebutuhan kesehatan yang spesifik membutuhkan penanganan yang spesifik pula sesuai dengan kondisi yang Anda alami. Layanan klinik rawat jalan kami didukung oleh dokter dari berbagai spesialisasi dan subspesialisasi serta tenaga medis profesional dalam menjamin pelayanan terbaik untuk Anda.'
			}
		},
		news: {
			tabPillsLabel: {
				all: 'Semua',
				news: 'Berita',
				healthArticles: 'Artikel Kesehatan',
				healthFirst: 'Health First'
			},
			heading: 'Berita dan Artikel Kesehatan',
			detailsBtnLabel: 'Lihat Detail',
			breadcrumbsLabel: 'Berita & Artikel Kesehatan',
			viewDetails: 'Lihat Detail',
			searchPlaceholder: 'Cari Artikel'
		},
		newsDetail: {
			breadcrumbsLabel: 'Berita & Artikel Kesehatan',
			oleh: 'Oleh',
			downloadFilePdf: 'Unduh majalah Health First di',
			here: ' sini',
			relatedNews: 'Artikel Terkait',
			specialty: 'Dokter Terkait',
		},
		forgotPassword: {
			heading: 'Lupa Password',
			subHeading: 'Silahkan masukan email terdaftar Anda, kami akan kirimkan tautan melalui email terdaftar untuk me-reset password Anda',
			resetBtnlabel: 'Kirim Permintaan',
			successMessage: {
				heading: 'Link Ubah Kata Sandi Sudah Dikirim',
				subHeading: 'Periksa kembali email Anda',
				subHeadingTail: 'untuk melanjutkan proses ubah kata sandi',
				buttonLabel: 'Okay'
			},
			form: {
				emailLabel: 'Email',
				emailPlaceholder: 'Email'
			}
		},
		resetPassword: {
			heading: 'Ubah Kata Sandi',
			subHeading: 'Masukkan data akun yang terdaftar dalam sistem kami',
			resetForm: {
				oldPasswordLabel: 'Kata Sandi Lama',
				oldPasswordPlaceHolder: 'Masukkan kata sandi lama',
				newPasswordLabel: 'Kata Sandi Baru',
				newPasswordPlaceHolder: 'Masukkan kata sandi baru',
				newPasswordConfirmationLabel: 'Konfirmasi Kata Sandi',
				newPasswordConfirmationPlaceholder: 'Konfirmasi kata sandi baru',
				resetBtnLabel: 'Reset Kata Sandi'
			},
		},
		resetEmail: {
			heading: 'Ubah Email',
			subHeading: 'Silahkan masukan email baru anda',
			resetForm: {
				oldEmailLabel: 'Email lama',
				oldEmailPlaceHolder: 'Silahkan masukan email lama anda',
				newEmailLabel: 'Email baru',
				newEmailPlaceHolder: 'Silahkan masukan email baru anda',
				newEmailConfirmationLabel: 'Konfirmasi email',
				newEmailConfirmationPlaceholder: 'Konfirmasi email baru anda',
				resetBtnLabel: 'Reset email'
			},
		},
		pinPage: {
			heading: 'Buat PIN Baru',
			headingReset: 'Ubah PIN',
			subHeading: 'Mohon ketik 6 digit numerik PIN untuk mengakses riwayat Anda secara lebih detail di Patient Portal',
			subHeadingReset: 'Masukkan 6 digit angka PIN Anda',
			notification: {
				onSuccessMsg: 'Berhasil membuat PIN',
				onErrorMsg: 'Terdapat Error',
				onSuccessMsgUpdatePin: 'Berhasil mengubah PIN',
			},
			form: {
				pinFieldLabel: 'PIN',
				pinConfirmLabel: 'Konfirmasi PIN',
				submitBtnLabel: {
					loading: 'Loading',
					default: 'Simpan PIN'
				},
				changeBtnLabel: {
					loading: 'Loading',
					default: 'Ubah PIN'
				}
			}
		},
		otpVerification: {
			heading: 'Masukkan Kode Verifikasi',
			subHeading: 'Masukkan kode yang dikirim melalui SMS ke nomor handphone anda',
			resendOtp: 'Kirim Ulang Kode',
			resendWarn: 'Anda punya kesempatan 3 kali untuk kirim ulang kode OTP.',
			form: {
				otpFieldLabel: 'OTP',
				submitBtnLabel: 'Submit OTP',
				backBtnlabel: 'Back to Home'
			}

		},
		loginPage: {
			heading: 'Selamat Datang',
			subHeading: 'Silahkan masukan data akun yang terdaftar di sistem kami',
			forgotPasswordLabel: 'Lupa Password?',
			loginBtnLabel: 'Masuk',
			footer: {
				notRegisteredLabel: 'Belum mempunyai akun? Silahkan mendaftar',
				cta: 'disini',
				notRegisteredLabelMobile: 'Belum mempunyai akun?',
				registerBtnLabel: 'Daftar',
			},
			form: {
				emailLabel: 'Email',
				emailPlaceholder: 'Email',
				passwordLabel: 'Password',
				passwordPlaceholder: 'Password'
			},
			notificationMessage: {
				emailNotVerified: {
					heading: 'Email Anda belum diverifikasi. SIlahkan',
					cta: 'Klik disini',
					tail: 'untuk melakukan verifikasi email',
					successMessage: 'Berhasil mengirim ulang verifikasi email'
				}
			},
			welcome: 'Selamat datang',
			resetEmailSuccess: 'Alamat email berhasil diubah',
			resetPasswordSuccess: 'Kata sandi berhasil diubah'
		},
		registerPage: {
			heading: 'Buat Akun Pasien',
			subHeading: 'Silahkan masukan data akun untuk melakukan pendaftaran',
			notificationMessage: {
				onSuccess: 'Berhasil',
				onError: 'Terdapat Error'
			},
			form: {
				emailLabel: 'Email',
				emailPlaceholder: 'Email',
				passwordLabel: 'Password',
				passwordPlaceholder: 'Masukan Password',
				passwordConfirmationLabel: 'Konfirmasi Password',
				passwordConfirmationPlaceholder: 'Masukan ulang password',
				passwordHint: 'Panjang password minimal 8 karakter dan terdapat minimal 1 huruf kapital'
			},
			registerBtnLabel: 'Daftar',
			footer: {
				hasAccountLabel: 'Sudah mempunyai akun? Silahkan masuk',
				cta: 'disini',
				hasAccountLabelMobile: 'Sudah mempunyai akun?',
				loginBtnLabel: 'Masuk',
			},
			buttonPrivacy: 'Lanjut',
			buttonTnC: 'Kirim',
			infoModal: {
				heading: 'Link Verifikasi Email Tekirim',
				subHeading: 'Mohon periksa email',
				subHeadingTail: 'untuk memverifikasi email Anda',
				buttonLabel: 'Okay'
			}
		},
		registerOnboard: {
			heading: 'Selamat Datang di RS Pondok Indah',
			subHeading: 'Masukkan nomor rekam medis Anda untuk mengakses seluruh fitur layanan RS Pondok Indah.',
			form: {
				mrlabel: 'Nomor rekam medis',
				mrPlaceholder: 'Nomor rekam medis',
				phoneLabel: 'No. Telepon',
				phonePlaceholder: 'No. Telepon',
				phoneHint: 'No telp yang diinput merupakan nomor telpon yang terdaftar di RS Pondok Indah Group',
				birthDateLabel: 'Tanggal lahir',
			},
			errors: {
				mrHasBeenRegistered: 'Nomor rekam medis yang Anda masukan sudah terdaftar',
				mrNotFound: 'Nomor rekam medis yang Anda masukkan belum terdaftar',
				phoneNotMatch: 'No yang Anda masukkan tidak sesuai dengan yang terdaftar di RS Pondok Indah Group',
				phoneHasBeenRegistered: 'No yang Anda masukkan telah terdaftar. Silakan ubah dengan no telepon baru',
				dobNotMatch: 'Data yang Anda masukkan tidak sesuai dengan yang terdaftar di database RS Pondok Indah',
				fieldIsEmpty: 'Harap masukan seluruh data',
				sendOtpFailed: 'OTP gagal terkirim'
			},
			submitBtnLabel: 'Simpan dan Lanjutkan',
			mrNotAvailableBtnLabel: 'Lewati'
		},
		profilePage: {
			heading: 'Informasi Pasien',
			subHeading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas at vestibulum nulla hac consectetur feugiat.',
			loginAsLabel: 'Login as',
			updatePhotoLabel: 'Ubah Foto',
			uploadPhotoLabel: 'Unggah Foto',
			deletePhotoLabel: 'Hapus Foto',
			choosePhotoLabel: 'Pilih Foto',
			formatPhotoLabel: 'JPG atau PNG, maks size 800k',
			profileLabel: 'Profil',
			securitySettingLabel: 'Pengaturan Keamanan',
			profileDetail: {
				patientIdLabel: 'Patient ID',
				lastVisitedHospitalLabel: 'Kunjungan Rumah Sakit Terakhir',
				lastVisitedDateLabel: 'Waktu Berkunjung Terakhir',
				patientNameLabel: 'Nama',
				patientNamePlaceholder: 'Nama',
				patientBirthDateLabel: 'Tanggal Lahir',
				patientBirthDatePlaceholder: 'Tanggal Lahir',
				patientGenderLabel: 'Jenis Kelamin ',
				patientGenderPlaceholder: 'Jenis Kelamin ',
				patientMedicalNumber: 'Nomor Rekam Medis',
				patientMedicalNumberPlaceholder: 'Nomor Rekam Medis',
				patientPhoneNumber: 'No. Telepon',
				patientPhoneNumberPlaceholder: 'No. Telepon',
				patientPhoneNumberLabelInfo: 'Jika ingin melakukan penggantian data terkait, silahkan mengunjungi RS Pondok Indah terdekat',
				patientEmail: 'Email',
				patientEmailPlaceholder: 'Email',
				patientOldEmail: 'Email Lama',
				patientOldEmailPlaceHolder: 'Email Lama',
				patientNewEmail: 'Email Baru',
				patientNewEmailPlaceHolder: 'Email Baru',
				patientEmailLabelInfo: 'Anda belum bisa melakukan perubahan alamat email jika belum mempunyai nomor rekam medis',
				patientGenderMaleLabel: 'Laki-laki',
				patientGenderFemaleLabel: 'Perempuan',
				patientPhotoProfile: 'Foto profil',
				editLabel: 'Ubah',
				successUpdateProfile: 'Berhasil update profil',
			},
			securitySetting: {
				heading: 'Pengaturan Keamanan',
				emailLabel: 'Email',
				phoneNumberLabel: 'Nomor Telepon',
				phoneNumberHint: 'Jika ingin melakukan penggantian data terkait, silahkan mengunjungi RS Pondok Indah terdekat',
				passwordLabel: 'Password',
				pinLabel: 'PIN',
				saveBtnLabel: 'Simpan',
				cancelBtnLabel: 'Batal',
				pinLabelInfo: 'PIN digunakan untuk mengakses fitur layanan portal pasien dan aktivitas keamanan pada akun Anda.',
				lastUpdatedPasswordLabel: 'Terakhir diupdate pada tanggal {date}'
			},
			medicalRecordLabel: 'Informasi Rekam Medis',
			medicalRecordEmptyInfo: '(Anda belum memiliki nomor rekam medis)',
			gender: {
				male: 'Laki-laki',
				female: 'Perempuan'
			},
			errorAllInputMustBeFilled: 'Informasi profil tidak boleh kosong guna untuk pengisian formulir otomatis pada saat buat janji temu'
		},
		patientPortal: {
			tabMenuLabel: {
				menu1: {
					heading: 'Jadwal Konsultasi'
				},
				menu2: {
					heading: 'Riwayat Medis',
					children: [
						'Konsultasi',
						'Vaksin',
						'Hasil Lab'
					]
				}
			},
			riwayatVaksin: {
				warning: 'Disclaimer: seluruh vaksin yang digunakan dalam proses vaksinasi merupakan vaksin dari RSPI',
				tableMenuLable: {
					vaccineType: 'Jenis Vaksin',
					vaccineName: 'Nama Vaksin',
					vaccineDate: 'Tanggal Vaksinasi'
				},
				empty: 'Anda belum memiliki riwayat vaksin saat ini.'
			},
			riwayatLab: {
				warning: 'Notes: PIN default yang digunakan saat membuka file laporan adalah tanggal lahir pasien dengan format berikut -> DD/MM/YYYY',
				tableMenuLable: {
					hospital: 'Rumah Sakit',
					date: 'Tanggal',
					doctor: 'Dokter',
					viewReport: 'Download'
				},
				empty: 'Anda belum memiliki riwayat lab saat ini.'

			},
			riwayatKunjungan: {
				label: {
					didNotCome: 'Patient did not come',
					canceledAppointment: 'Jadwal Dibatalkan',
					doneAppointment: 'Jadwal Selesai',
					seeDetail: 'Lihat Detail',
					recommendDoctor: 'Apakah Anda akan merekomendasikan dokter Anda?'

				},
				recommendDoctorModal: {
					header: 'Apakah Anda akan merekomendasikan dokter Anda kepada teman atau keluarga Anda?',
					rating: [
						'Sangat tidak direkomendasikan',
						'Sangat direkomendasikan'
					],
					feedback: {
						headingLove: 'Apa yang Anda sukai dari dokter Anda?',
						headingImprove: 'Apa yang ingin Anda tingkatkan dari dokter Anda?',
						notesInputLabel: 'Beritahu kami lebih lanjut',
						notesInputPlaceholder: 'Masukkan deskripsi...',
						optionalLabel: '(Opsional)',
						smallNotes: 'Hal ini akan membantu kami untuk terus meningkatkan layanan kami.',
						responReviewFailed: 'Review telah gagal',
						responReviewSuccess: 'Review telah berhasil'
					}
				},
				empty: 'Anda belum mempunyai data riwayat konsultasi saat ini.',
				btnConsultationSchedule: 'Jadwalkan Konsultasi'
			},
			jadwalKunjungan: {
				label: {
					queueNo: 'No. Antrian:',
					activeSchedule: 'Jadwal Aktif',
					cancelAppointment: 'Batalkan Janji Temu',
					empty: 'Anda belum mempunyai data kunjungan saat ini',
					emptyBtnCta: 'Jadwalkan Kunjungan',
					visitSchedule: 'Jadwal Konsultasi',
					reschedule: 'Jadwalkan Ulang',
					rescheduleAgain: 'Jadwalkan Lagi'
				},
				options: [
					'Diri Sendiri',
					'Orang Lain'
				],
				statusLabel: {
					C: 'Jadwal Selesai',
					X: 'Jadwal Dibatalkan',
					N: 'Tidak Hadir',
					H: 'Hold',
					T: 'Transferred',
					A: 'Arrived',
					P: 'Postponed',
					S: 'Seen Doctor',
					U: 'Arrived Not Seen',
					D: 'Departed'
				},
				teleconsultationLabel: 'Telekonsultasi',
				offlineConsultation: 'Konsultasi Tatap Muka'
			},
			cancelBooking: {
				heading: 'Konfirmasi Pembatalan',
				warningText: 'Apakah Anda yakin ingin membatalkan janji temu dengan dokter?',
				patientData: {
					heading: 'Data Pasien',
					nameLabel: 'Nama : ',
					dobLabel: 'Tanggal Lahir : ',
					phoneLabel: 'No HP : ',
					consultationScheduleLabel: 'Jadwal Konsultasi',
					btnSubmitLabel: 'Batalkan Kunjungan'
				}
			}
		},
		findDoctor: {
			heading: 'Cari Dokter',
			label: {
				hospital: 'Rumah sakit',
				doctorName: 'Nama Dokter',
				specialty: 'Spesialisasi',
				doctorFound: 'Dokter Ditemukan',
				seeDetail: 'Book Appointment',
				applyFilter: 'Terapkan',
				seeSchedule: 'Lihat Jadwal',
				closeSchedule: 'Tutup Jadwal'
			},

		},
		doctorProfile: {
			bookAppointmentLabel: 'Buat Janji Temu',
			scheduleHeading: 'Jadwal Dokter',
			form: {
				visitDateLabel: 'Tanggal Kunjungan',
				hospitalLabel: 'Rumah sakit',
				clinicLabel: 'Klinik',
				btnLabel: {
					back: 'Kembali',
					submit: 'Lanjut'
				}
			},
			slotEmptyState: 'Silahkan pilih tanggal untuk menampilkan informasi jam yang tersedia.',
			notAvailableSchedule: 'Jadwal dokter tidak tersedia di tanggal yang Anda pilih karena sudah mencapai maksimal reservasi online. Silakan pilih tanggal dan waktu lain yang tersedia di bawah ini atau hubungi call center kami untuk informasi lebih lanjut',
			callCenter: 'Hubungi Call Center',
			chooseRs: 'Pilih Rumah Sakit',
			available: 'Tersedia',
			limitedSlot: 'Slot Terbatas',
			noSchedule: 'Jadwal Tidak Tersedia',
			successTitle: 'Form telah berhasil dikirim!',
			successBody: 'Pembuatan janji temu Anda dengan ',
			in: 'di',
			at: 'pada',
			hasSuccess: 'telah berhasil.',
			asuransiCard: 'Foto Kartu Asuransi (Opsional)',
			asuransiCardFront: 'Upload foto tampak depan',
			asuransiCardBack: 'Upload foto tampak belakang',
			labelPhoneModal: 'Silahkan hubungi call center',
			visitAppOptionLabel: 'Kunjungan Tatap Muka'
		},
		footer: {
			visitorInfo: {
				hospitalDirectory: 'Direktori Rumah Sakit',
				partnerInsurance: 'Perusahaan Asuransi Mitra',
				paymentAdministration: 'Administrasi Pembayaran',
			},
			patientInfo: {
				visitHoursPolicy: 'Tata Tertib & Waktu Berkunjung',
				ourEffort: 'Upaya Kami Menjaga Anda Tetap Aman'
			},
			ourHospitalsLabel: 'RUMAH SAKIT KAMI',
			ourCompanyLabel: 'PERUSAHAAN KAMI',
			visitorPatientLabel: 'INFORMASI PENGUNJUNG DAN PASIEN',
			followUsLabel: 'IKUTI KAMI',
			getRSPIMobileLabel: 'DAPATKAN APLIKASI RSPI',
			subscribeLabel: 'IKUTI PERKEMBANGAN BERSAMA KAMI',
			subscribeDescription: 'Daftarkan e-mail Anda untuk berlangganan newsletter dan mendapatkan informasi terbaru dari RS Pondok Indah Group.',
			subscribePlaceholder: 'Masukkan alamat email',
			subscribeSubmit: 'Subscribe',
			errorSubs: 'Proses berlangganan gagal dilakukan',
			successSubs: 'Proses berlangganan berhasil dilakukan',
			handleButtonModalSubmit: 'Tutup',
		},
		medicalRecordReminder: {
			heading: 'Dapatkan Akses terhadap Informasi Kunjungan Medis Anda',
			btnLabel: 'Isi Data Rekam Medis',
			tooltipLabel: 'Pastikan Anda telah booking appointment dan melakukan kunjungan ke RSPI terdekat.'
		},
		topNav: {
			welcome: 'Selamat datang',
			contactUs: 'Hubungi Kami'
		},
		privacyPolicy: {
			agreementStatement: {
				preText: 'Saya',
				boldText: 'menyetujui',
				tailText: 'ketentuan Terms and Conditions'
			},
			buttonPrivacy: 'Lanjut',
			buttonTnC: 'Kirim',
		},
		updatePassword: {
			heading: 'Ubah Password',
			subHeading: 'Silahkan masukkan password baru anda',
			resetForm: {
				oldPasswordLabel: 'Kata Sandi Lama',
				oldPasswordPlaceHolder: 'Masukkan kata sandi lama',
				newPasswordLabel: 'Kata Sandi Baru',
				newPasswordPlaceHolder: 'Masukkan kata sandi baru',
				newPasswordConfirmationLabel: 'Konfirmasi Kata Sandi',
				newPasswordConfirmationPlaceholder: 'Konfirmasi kata sandi baru',
				resetBtnLabel: 'Ubah Password'
			},
			forgotPasswordLabel: 'Lupa Password?',
			lastUpdatedPasswordLabel: 'Terakhir diupdate pada tanggal {date}'
		},
	},
} as const;
