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
			subHeading: 'Silakan pilih Rumah sakit: '
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
		subHeadingSuccess: 'Anda sekarang berhenti berlangganan. Preferensi Anda penting bagi kami, dan kami menghargai keputusan Anda. Jika Anda berubah pikiran, silakan bergabung dengan kami lagi. Terima kasih.',
		headingFailed: 'Gagal Berhenti Belangganan',
		subHeadingFailed: 'Berhenti berlangganan berita terbaru tentang RSPI gagal, Silakan coba lagi',
	},
	modalDialog: {
		pin: {
			header: 'Masukkan PIN',
			subHeader: 'Silakan masukkan PIN untuk melanjutkan.',
			submitBtnLabel: 'Konfirmasi',
			pinLabel: 'PIN',
			forgotPin: 'Lupa PIN?',
			labelSuccess1: 'Mohon cek email Anda',
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
			desc: 'Silakan log out secara manual.',
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
					heading: 'Apakah anda yakin ingin menghapus data orang lain',
					yesLabel: 'Ya',
					noLabel: 'Tidak'
				},
				selfLabel: 'Profil Diri sendiri :',
				other: 'Profil Orang lain :',
				addSelfProfile: 'Tambah Profil Diri Sendiri :',
				editOtherProfile: 'Edit Profil ',
				addOtherProfile: 'Tambah Profil Orang Lain :',
				form: {
					selfHeading: 'Tambah profil diri sendiri',
					otherHeading: 'Tambah profil orang lain',
					name: 'Nama',
					email: 'E-Mail',
					phone: 'No Hp',
					gender: 'Jenis Kelamin',
					submit: 'Simpan',
					edit: 'Ubah',
					dob: 'Tanggal Lahir',
					genderLabel: {
						male: 'Laki-laki',
						female: 'Perempuan'
					}
				},
				emptyOther: 'Belum ada data orang lain',
				emptySelf: 'Data diri Kosong',
				addProfileLabelOnEmpty: 'Tambahkan',
				addNewProfile: 'Tambahkan Profil baru'
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
				disclaimer: 'Data yang diberikan adalah benar. Pendaftaran dilakukan untuk diri sendiri. Jika pendaftaran dilakukan untuk orang lain, sudah mendapatkan persetujuan dari pihak terkait.',
				errorEmptyData: 'Pastikan Data Keluhan dan Penjamin Terisi',
				btnLabel: {
					back: 'Kembali',
					submit: 'Lanjutkan'
				}
			},
			confirmationModal: {
				heading: 'Konfirmasi Booking Appointment',
				subHeading: 'Silakan periksa dan konfirmasi kebenaran informasi berikut: ',
				insuranceDataLabel: 'Data Asuransi',
				insuranceNumber: 'Nomor Asuransi',
				patientDetail: {
					heading: 'Data Pasien:',
					name: 'Nama:',
					birthDate: 'Tanggal lahir:',
					phone: 'Nomor HP:',
					email: 'E-Mail:',
					guarantor: 'Penjamin:'
				},
				toc: 'Saya menyatakan bahwa seluruh data di atas sudah benar.',
				confirmBtnLabel: 'Konfirmasi',
				profileIncompleteMsg: 'Terdapat Data Diri yang Belum Lengkap',
				redirectLabel: 'Silakan klik tombol di bawah ini untuk diarahkan ke halaman profil',
				redirectBtnLabel: 'Menuju Halaman Profil'
			},
			success: {
				heading: 'Form telah berhasil dikirim!',
				subHeading: {
					main: 'Pembuatan janji temu Anda dengan',
					at: 'di',
					on: 'pada',
					done: 'telah berhasil.'
				},
				btnLabel: 'Oke'
			},
			bookingForm: {
				insuranceData: 'Data Penjamin Asuransi'
			}
		},
		unsubscribe: {
			headingSuccess: 'Berhasil Berhenti Belangganan',
			subHeadingSuccess: 'Anda sekarang berhenti berlangganan. Preferensi Anda penting bagi kami, dan kami menghargai keputusan Anda. Jika Anda berubah pikiran, silakan bergabung dengan kami lagi. Terima kasih.',
			headingFailed: 'Gagal Berhenti Belangganan',
			subHeadingFailed: 'Berhenti berlangganan berita terbaru tentang RSPI gagal, Silakan coba lagi',
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
					notes: 'Masukkan pesan di sini...'
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
					maternity: 'Apakah ada informasi terkait persalinan di RS Pondok Indah?',
					homeVisit: 'Apakah RS Pondok Indah memiliki layanan Home Visit?',
				},
				answers: {
					doctorSchedule: '<p><span style="">Anda dapat melihat jadwal praktik seluruh dokter RS Pondok Indah Group melalui </span><a style="text-decoration: none;" href="https://www.rspondokindah.co.id/id/find-a-doctor" target="_blank">laman berikut</a> yang juga dapat diakses melalui RSPI Mobile (mobile apps) kami. </p>',
					assurance: '<p><span style="">RS Pondok Indah Group telah bekerja sama dengan berbagai asuransi terpercaya, baik di dalam maupun luar negeri. Untuk melihat asuransi yang bermitra dengan kami, Anda dapat mengakses </span><a style="text-decoration: none;" href="https://www.rspondokindah.co.id/id/perusahaan-asuransi-mitra"><span style=" text-decoration: underline; text-decoration-skip-ink: none;">laman berikut</span></a></p>',
					visitHours: `<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="">Waktu kunjungan setiap unit perawatan dapat berbeda. Untuk menjaga ketenangan dan kenyamanan seluruh pasien kami, kunjungan hanya dapat dilakukan pada jam tertentu dan dilakukan secara bergantian.</span></p>
					<p>&nbsp;</p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><strong><span style="">Waktu Berkunjung</span></strong></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="">Kamar Rawat Inap Umum &amp; Melihat Bayi</span></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="">Siang: 11.00 &ndash; 13.00 WIB</span></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="">Sore: 18.00 &ndash; 20.00 WIB</span></p>
					<p>&nbsp;</p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="">ICU, ICCU</span></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="">Siang: 11.00 &ndash; 12.00 WIB</span></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="">Sore: 18.00 &ndash; 19.00 WIB</span></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="">Hanya diperbolehkan 1 orang pada satu waktu. Anak-anak tidak diperbolehkan berada di unit ini</span></p>
					<p>&nbsp;</p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="">Ruang NICU &amp; </span><em><span style="">Intermediate </span></em><span style="">Bayi</span></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="">Siang: 11.00 &ndash; 13.00 WIB</span></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="">Sore: 18.00 &ndash; 20.00 WIB</span></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="">Hanya orang tua yang diizinkan berkunjung. Maksimum 2 orang untuk setiap pasien, diizinkan untuk berkunjung di waktu yang sama.</span></p>`,
					checkUp: `<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="">Pemeriksaan kesehatan atau </span><a style="text-decoration: none;" href="https://www.rspondokindah.co.id/id/facilities-services/executive-health-check-up"><em><span style="font-size: 14px;  color: rgb(17, 85, 204); text-decoration: underline; text-decoration-skip-ink: none;">Executive Health Check Up</span></em></a><span style=""> lengkap tersedia di ketiga cabang RS Pondok Indah Group. Kami menghadirkan berbagai paket </span><em><span style="">medical check up</span></em><span style="">, termasuk pemeriksaan kesehatan untuk anak. Silakan berkonsultasi dengan tim kami untuk mengetahui paket yang sesuai dengan kebutuhan Anda.</span></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;">&nbsp;</p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="">Untuk informasi lebih lanjut atau membuat perjanjian, silakan menghubungi:</span></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;">&nbsp;</p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="">Executive Health Check Up RS Pondok Indah - Pondok Indah</span></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="">Informasi &amp; Perjanjian:</span></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="">(62-21) 7507169, 765 7525 Ext. 2267/2318</span></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="">WhatsApp:</span></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><a style="text-decoration: none;" href="https://api.whatsapp.com/send?phone=6281283112725"><span style="font-size: 14px;  color: rgb(17, 85, 204); text-decoration: underline; text-decoration-skip-ink: none;">0812-8311-2725</span></a></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><em><span style="">E-mail:</span></em></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><a style="text-decoration: none;" href="mailto:hcupondok@rspondokindah.co.id"><span style="font-size: 14px;  color: rgb(17, 85, 204); text-decoration: underline; text-decoration-skip-ink: none;">hcupondok@rspondokindah.co.id</span></a><span style="">&nbsp;</span></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="">[</span><a style="text-decoration: none;" href="https://storage.googleapis.com/rspi-assets-production/rspi-api/uploads/F30021-20230307125551.pdf"><span style="font-size: 14px;  color: rgb(17, 85, 204); text-decoration: underline; text-decoration-skip-ink: none;">Paket EHCU - RSPI Pondok Indah</span></a><span style="">]</span></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;">&nbsp;</p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="">Executive Health Check Up RS Pondok Indah - Puri Indah</span></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="">Informasi &amp; Perjanjian:</span></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="">(62-21) 2569 5252, 2569 5200 Ext. 2100</span></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="">WhatsApp:</span></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><a style="text-decoration: none;" href="https://api.whatsapp.com/send?phone=6282180887838"><span style="font-size: 14px;  color: rgb(17, 85, 204); text-decoration: underline; text-decoration-skip-ink: none;">0821-8088-7838</span></a></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><em><span style="">E-mail:</span></em></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><a style="text-decoration: none;" href="mailto:hcupuri@rspondokindah.co.id"><span style="font-size: 14px;  color: rgb(17, 85, 204); text-decoration: underline; text-decoration-skip-ink: none;">hcupuri@rspondokindah.co.id</span></a><span style="">&nbsp;</span></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="">[</span><a style="text-decoration: none;" href="https://storage.googleapis.com/rspi-assets-production/rspi-api/uploads/Z81201-20230307125040.pdf"><span style="font-size: 14px;  color: rgb(17, 85, 204); text-decoration: underline; text-decoration-skip-ink: none;">Paket EHCU - RSPI Puri Indah</span></a><span style="">]</span></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;">&nbsp;</p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="">Executive Health Check Up RS Pondok Indah - Bintaro Jaya</span></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="">Informasi &amp; Perjanjian:</span></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="">(62-21) 8082 8888 Ext. 2301/2302</span></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="">WhatsApp:</span></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><a style="text-decoration: none;" href="https://api.whatsapp.com/send?phone=628119227982"><span style="font-size: 14px;  color: rgb(17, 85, 204); text-decoration: underline; text-decoration-skip-ink: none;">0811-9227-982</span></a></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><em><span style="">E-mail:</span></em></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><a style="text-decoration: none;" href="mailto:hcubintaro@rspondokindah.co.id"><span style="font-size: 14px;  color: rgb(17, 85, 204); text-decoration: underline; text-decoration-skip-ink: none;">hcubintaro@rspondokindah.co.id</span></a></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="">[</span><a style="text-decoration: none;" href="https://storage.googleapis.com/rspi-assets-production/rspi-api/uploads/M37594-20220330105057.pdf"><span style="font-size: 14px;  color: rgb(17, 85, 204); text-decoration: underline; text-decoration-skip-ink: none;">Paket EHCU - RSPI Bintaro Jaya</span></a><span style="">]</span> </p>`,
					travelVaccine: `<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="">RS Pondok Indah memiliki layanan vaksinasi perjalanan. Kami juga melayani penerbitan sertifikat vaksinasi internasional atau "buku kuning".</span></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;">&nbsp;</p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="">Untuk informasi lebih lanjut, silakan menghubungi:</span></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="">Executive Health Check Up RS Pondok Indah - Pondok Indah</span></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="">Informasi &amp; Perjanjian:</span></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="">(62-21) 7507169, 765 7525 Ext. 2267/2318</span></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="">WhatsApp:</span></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><a style="text-decoration: none;" href="https://api.whatsapp.com/send?phone=6281283112725"><span style="font-size: 14px;  color: rgb(17, 85, 204); text-decoration: underline; text-decoration-skip-ink: none;">0812-8311-2725</span></a></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><em><span style="">E-mail:</span></em></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><a style="text-decoration: none;" href="mailto:hcupondok@rspondokindah.co.id"><span style="font-size: 14px;  color: rgb(17, 85, 204); text-decoration: underline; text-decoration-skip-ink: none;">hcupondok@rspondokindah.co.id</span></a><span style="">&nbsp;</span></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;">&nbsp;</p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="">Executive Health Check Up RS Pondok Indah - Puri Indah</span></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="">Informasi &amp; Perjanjian:</span></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="">(62-21) 2569 5252, 2569 5200 Ext. 2100</span></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="">WhatsApp:</span></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><a style="text-decoration: none;" href="https://api.whatsapp.com/send?phone=6282180887838"><span style="font-size: 14px;  color: rgb(17, 85, 204); text-decoration: underline; text-decoration-skip-ink: none;">0821-8088-7838</span></a></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><em><span style="">E-mail:</span></em></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><a style="text-decoration: none;" href="mailto:hcupuri@rspondokindah.co.id"><span style="font-size: 14px;  color: rgb(17, 85, 204); text-decoration: underline; text-decoration-skip-ink: none;">hcupuri@rspondokindah.co.id</span></a><span style="">&nbsp;</span></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;">&nbsp;</p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="">Executive Health Check Up RS Pondok Indah - Bintaro Jaya</span></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="">Informasi &amp; Perjanjian:</span></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="">(62-21) 8082 8888 Ext. 2301/2302</span></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="">WhatsApp:</span></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><a style="text-decoration: none;" href="https://api.whatsapp.com/send?phone=628119227982"><span style="font-size: 14px;  color: rgb(17, 85, 204); text-decoration: underline; text-decoration-skip-ink: none;">0811-9227-982</span></a></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><em><span style="">E-mail:</span></em></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><a style="text-decoration: none;" href="mailto:hcubintaro@rspondokindah.co.id"><span style="font-size: 14px;  color: rgb(17, 85, 204); text-decoration: underline; text-decoration-skip-ink: none;">hcubintaro@rspondokindah.co.id</span></a><span style=""> </span> </p>`,
					telemedicine: `<p style="line-height: 1.8; background-color: rgb(255, 255, 255); margin-top: 11pt; margin-bottom: 0pt;"><span style="">RS Pondok Indah Group memiliki layanan konsultasi jarak jauh, atau telemedicine. Kini, Anda dapat berkonsultasi dengan dokter kami mela</span><span style="">lui </span>video call<span style=""> dengan lebih nyaman. Layanan ini menggunakan aplikasi Zoom, di perangkat </span><em><span style="">gadget </span></em><span style="">Anda, sehin</span><span style="">gga Anda tidak perlu keluar rumah untuk berkonsultasi dengan dokter kami.</span></p>
					<h3 style="line-height: 1.8; background-color: rgb(255, 255, 255); margin-top: 0pt; margin-bottom: 4pt; padding-top: 22pt;"><span style="font-size: 14pt;  color: rgb(67, 67, 67); font-weight: 400;">Mekanisme Telemedicine RS Pondok Indah Group</span></h3>
					<ol style="margin-top: 0px; margin-bottom: 0px; padding-inline-start: 48px;">
					<li style="">
					<p style="line-height: 1.8; margin-top: 22pt; margin-bottom: 0pt;"><span style="font-size: 14px;">Pastikan Anda sudah menjadi pasien RS Pondok Indah Group dan memiliki nomor rekam medis</span></p>
					</li>
					<li style="">
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;">Hubungi Call Center RS Pondok Indah yang Anda tuju untuk mendaftar dan/atau mengecek jadwal praktek dokter kami yang menyediakan layanan Telemedicine</span></p>
					</li>
					<li style="">
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;">Klik</span><span style="font-size: 14px; color: rgb(0, 0, 0);"> tautan yang kami kirimkan </span>melalui nomor WhatsApp Anda<span style="font-size: 14px; color: rgb(0, 0, 0);"> u</span><span style="font-size: 14px;">ntuk memulai sesi konsultasi pada waktu yang ditetapkan</span></p>
					</li>
					<li style="">
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;">Selesaikan langkah administrasi yang kami kirimkan ke </span><em><span style="font-size: 14px; color: rgb(0, 0, 0);">e-mail</span></em><em><span style="font-size: 14px;"> </span></em><span style="font-size: 14px;">Anda</span></p>
					</li>
					<li style="">
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;">Layanan Telemedicine ini hanya dapat dilakukan dengan sistem pembayaran pribadi (</span><em><span style="font-size: 14px; color: rgb(0, 0, 0);">self-paid</span></em><span style="font-size: 14px;">) melalui transfer bank. Kami belum dapat menerima pembayaran dengan asuransi ataupun pembayaran dengan kartu kredit/debit</span></p>
					</li>
					<li style="">
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;">Apabila dokter meresepkan obat atau meminta pemeriksaan darah untuk Anda, Anda dapat meminta obat untuk dikirim ke rumah Anda (untuk wilayah tertentu) dan melakukan pengambilan darah di rumah Anda pada waktu yang ditentukan setelah Anda menyelesaikan administrasi. </span></p>
					</li>
					</ol>`,
					maternity: `<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="">Menanti kehadiran sang buah hati merupakan momen perjalanan hidup yang istimewa dan sangat berharga bagi Anda dan pasangan. Memahami hal tersebut, RS Pondok Indah Group menghadirkan </span><a style="text-decoration: none;" href="https://www.rspondokindah.co.id/id/promo/maternity-first"><strong><span style="font-size: 14px;  color: rgb(17, 85, 204); text-decoration: underline; text-decoration-skip-ink: none;">Maternity First</span></strong></a><span style="">, yaitu pelayanan kehamilan yang lengkap dan terpadu, untuk menciptakan pengalaman terbaik menyambut sang buah hati sejak masa kehamilan, melahirkan, dan pasca persalinan, meliputi:</span></p>
					<p style="line-height: 1.8; background-color: rgb(255, 255, 255); margin-top: 11pt; margin-bottom: 0pt;">&nbsp;</p>
					<ul style="margin-top: 0px; margin-bottom: 0px; padding-inline-start: 48px;">
					<li style="list-style-type: initial;">
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;">Tenaga medis profesional, termasuk dokter spesialis obstetri dan ginekologi, dokter spesialis obstetri dan ginekologi subspesialis fetomaternal, dokter spesialis anak, dan dokter konselor laktasi</span></p>
					</li>
					<li style="list-style-type: initial;">
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><em><span style="font-size: 14px;">Maternity Counselor</span></em><span style="font-size: 14px;"> yang dapat dihubungi via WhatsApp 24 jam untuk membantu menjawab pertanyaan ibu selama menjalani masa kehamilan</span></p>
					</li>
					<li style="list-style-type: initial;">
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;">Fasilitas dan teknologi medis terkini, seperti USG 4D</span></p>
					</li>
					<li style="list-style-type: initial;">
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><em><span style="font-size: 14px;">Five-stars facilities </span></em><span style="font-size: 14px;">di ruang perawatan, ruang bersalin, kamar operasi, ruang bayi termasuk fasilitas NICU</span></p>
					</li>
					<li style="list-style-type: initial;">
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;">100% dukungan untuk IMD (Inisiasi Menyusu Dini) dan pemberian ASI eksklusif</span></p>
					</li>
					<li style="list-style-type: initial;">
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><em><span style="font-size: 14px;">Maternity Classes </span></em><span style="font-size: 14px;">meliputi kelas senam hamil, prenatal Yoga, dan parenting class</span></p>
					</li>
					</ul>
					<p style="line-height: 1.8; background-color: rgb(255, 255, 255); margin-top: 11pt; margin-bottom: 0pt;">&nbsp;</p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="">Untuk informasi lebih lanjut, silakan menghubungi:</span></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="">RS Pondok Indah &ndash; Pondok Indah</span></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="">Klinik Kebidanan dan Kandungan Lantai 3</span></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="">(021) 765 7525 Ext. 2</span></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><em><span style="">Maternity Counselor</span></em><span style=""> (WhatsApp </span><em><span style="">chat only</span></em><span style="">): </span><a style="text-decoration: none;" href="https://api.whatsapp.com/send?phone=6281388887273"><span style="font-size: 14px;  color: rgb(17, 85, 204); text-decoration: underline; text-decoration-skip-ink: none;">081388887273</span></a></p>
					<p style="line-height: 1.8; background-color: rgb(255, 255, 255); margin-top: 11pt; margin-bottom: 0pt;">&nbsp;</p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="">RS Pondok Indah - Puri Indah</span></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="">Klinik Kebidanan dan Kandungan Lantai 7</span></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="">(021) 2569 5200 Ext. 2</span></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><em><span style="">Maternity Counselor</span></em><span style=""> (WhatsApp </span><em><span style="">chat only</span></em><span style="">): </span><a style="text-decoration: none;" href="https://api.whatsapp.com/send?phone=6281388889096"><span style="font-size: 14px;  color: rgb(17, 85, 204); text-decoration: underline; text-decoration-skip-ink: none;">081388889096</span></a></p>
					<p style="line-height: 1.8; background-color: rgb(255, 255, 255); margin-top: 11pt; margin-bottom: 0pt;">&nbsp;</p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="">RS Pondok Indah &ndash; Bintaro Jaya</span></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="">Klinik Kebidanan dan Kandungan Lantai 6</span></p>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="">(021) 8082 8888 Ext. 2/6012</span></p>
					<p style="line-height: 1.8; background-color: rgb(255, 255, 255); margin-top: 11pt; margin-bottom: 0pt;"><em><span style="">Maternity Counselor </span></em><span style="">(WhatsApp </span><em><span style="">chat only</span></em><span style="">): </span><a style="text-decoration: none;" href="https://api.whatsapp.com/send?phone=6281295998870"><span style="font-size: 14px;  color: rgb(17, 85, 204); text-decoration: underline; text-decoration-skip-ink: none;">081295998870</span></a> </p>`,
					homeVisit: `<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">Kami memiliki layanan </span><em><span style="font-size: 14px;  color: rgb(0, 0, 0);">Home Visit </span></em><span style="font-size: 14px;  color: rgb(0, 0, 0);">untuk wilayah tertentu. Beberapa layanan yang dapat kami lakukan antara lain:</span></p>
					<ul style="margin-top: 0px; margin-bottom: 0px; padding-inline-start: 48px;">
					<li style="list-style-type: initial; font-size: 14px;  color: rgb(67, 67, 67);">
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;">Pemeriksaan dan konsultasi oleh dokter umum, dokter spesialis penyakit dalam, dokter spesialis gizi</span></p>
					</li>
					<li style="list-style-type: initial; font-size: 14px;  color: rgb(67, 67, 67);">
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;">Pemasangan/penggantian selang NGT</span></p>
					</li>
					<li style="list-style-type: initial; font-size: 14px;  color: rgb(67, 67, 67);">
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;">Pemasangan/penggantian kateter urine</span></p>
					</li>
					<li style="list-style-type: initial; font-size: 14px;  color: rgb(67, 67, 67);">
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;">Perawatan stoma</span></p>
					</li>
					<li style="list-style-type: initial; font-size: 14px;  color: rgb(67, 67, 67);">
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;">Perawatan luka</span></p>
					</li>
					<li style="list-style-type: initial; font-size: 14px;  color: rgb(67, 67, 67);">
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;">Pengambilan sampel laboratorium</span></p>
					</li>
					<li style="list-style-type: initial; font-size: 14px;  color: rgb(67, 67, 67);">
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;">Memandikan bayi</span></p>
					</li>
					<li style="list-style-type: initial; font-size: 14px;  color: rgb(67, 67, 67);">
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;">Vaksinasi</span></p>
					</li>
					<li style="list-style-type: initial; font-size: 14px;  color: rgb(67, 67, 67);">
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;">dan tindakan lainnya</span></p>
					</li>
					</ul>
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;">&nbsp;</p>
					<h3 style="line-height: 1.8; background-color: rgb(255, 255, 255); margin-top: 0pt; margin-bottom: 4pt;"><span style="font-size: 14pt;  color: rgb(67, 67, 67); font-weight: 400;">Mekanisme </span><em><span style="font-size: 14pt;  color: rgb(67, 67, 67); font-weight: 400;">Home Visit </span></em><span style="font-size: 14pt;  color: rgb(67, 67, 67); font-weight: 400;">RS Pondok Indah Group</span></h3>
					<ol style="margin-top: 0px; margin-bottom: 0px; padding-inline-start: 48px;">
					<li style="">
					<p style="line-height: 1.8; margin-top: 22pt; margin-bottom: 0pt;"><span style="font-size: 14px;">Layanan Home Visit berlaku untuk pasien yang berada di sekitar lokasi RS Pondok Indah Group dengan radius maksimal 10 km</span></p>
					</li>
					<li style="">
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;">Pastikan Anda sudah menjadi pasien RS Pondok Indah Group dan memiliki nomor rekam medis</span></p>
					</li>
					<li style="">
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;">Kirim pesan WhatsApp untuk membuat perjanjian Layanan </span><em><span style="font-size: 14px;">Home Visit </span></em><span style="font-size: 14px;">H-1 (jam kerja 08.00 - 17.00) ke:</span></p>
					<ol style="padding-inline-start: 48px;">
					<li style="list-style-type: lower-alpha; ">
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;">RS Pondok Indah - Pondok Indah +62 821-1999-0881&nbsp;</span></p>
					</li>
					<li style="list-style-type: lower-alpha; ">
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;">RS Pondok Indah - Puri Indah +62 821-1999-0882</span></p>
					</li>
					<li style="list-style-type: lower-alpha; ">
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;">RS Pondok Indah - Bintaro Jaya +62 821-1999-0883</span></p>
					</li>
					</ol>
					</li>
					<li style="">
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;">Tim </span><em><span style="font-size: 14px;">Home Visit </span></em><span style="font-size: 14px;">akan menghubungi Anda untuk mengkaji layanan atau tindakan yang dibutuhkan dan mempersiapkan sesuai kebutuhan pasien</span></p>
					</li>
					<li style="">
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;">Tim </span><em><span style="font-size: 14px;">Home Visit </span></em><span style="font-size: 14px;">akan melakukan konfirmasi untuk kedatangan ke rumah pasien H-1 perihal jam kedatangan</span></p>
					</li>
					<li style="">
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;">Tim </span><em><span style="font-size: 14px;">Home Visit </span></em><span style="font-size: 14px;">akan mendata tindakan, pemakaian alat dan obat yang digunakan di rumah Anda dan berkoordinasi dengan bagian unit operasional terkait</span></p>
					</li>
					<li style="">
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;">Setelah selesai dari rumah Anda, Kasir akan mengirimkan </span><em><span style="font-size: 14px;">invoice </span></em><span style="font-size: 14px;">melalui WhatsApp sesuai </span><em><span style="font-size: 14px;">billing </span></em><span style="font-size: 14px;">dan mengirimkan nomor rekening RS Pondok Indah agar Anda dapat melakukan pembayaran melalui transfer bank</span></p>
					</li>
					<li style="">
					<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">Layanan </span><em><span style="font-size: 14px;  color: rgb(0, 0, 0);">Home Visit</span></em><span style="font-size: 14px;  color: rgb(0, 0, 0);"> ini hanya dapat dilakukan dengan sistem pembayaran pribadi (</span><em><span style="font-size: 14px;  color: rgb(0, 0, 0);">self-paid</span></em><span style="font-size: 14px;  color: rgb(0, 0, 0);">) melalui transfer bank. Kami belum dapat menerima pembayaran dengan asuransi ataupun pembayaran dengan kartu kredit/debit</span> </p>
					</li>
					</ol>`
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
			subHeading: 'Silakan masukkan email terdaftar Anda, kami akan kirimkan tautan melalui email terdaftar untuk me-reset password Anda',
			resetBtnlabel: 'Kirim Permintaan',
			successMessage: {
				heading: 'Link Ubah Kata Sandi Sudah Dikirim',
				subHeading: 'Periksa kembali email Anda',
				subHeadingTail: 'untuk melanjutkan proses ubah kata sandi',
				buttonLabel: 'Oke'
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
			subHeading: 'Silakan masukkan email baru anda',
			resetForm: {
				oldEmailLabel: 'Email lama',
				oldEmailPlaceHolder: 'Silakan masukkan email lama anda',
				newEmailLabel: 'Email baru',
				newEmailPlaceHolder: 'Silakan masukkan email baru anda',
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
			subHeading: 'Masukkan kode yang dikirim melalui SMS ke nomor',
			handphone: 'handphone',
			yourlabel: 'Anda',
			resendOtp: 'Kirim Ulang Kode',
			resendWarn: 'Anda punya kesempatan 3 kali untuk kirim ulang kode OTP.',
			form: {
				otpFieldLabel: 'OTP',
				submitBtnLabel: 'Kirim OTP',
				backBtnlabel: 'Back to Home'
			}

		},
		loginPage: {
			heading: 'Selamat Datang',
			subHeading: 'Silakan masukkan data akun yang terdaftar di sistem kami',
			forgotPasswordLabel: 'Lupa Password?',
			loginBtnLabel: 'Masuk',
			footer: {
				notRegisteredLabel: 'Belum mempunyai akun? Silakan mendaftar',
				cta: 'di sini',
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
					heading: 'Email Anda belum diverifikasi. Silakan',
					cta: 'Klik di sini',
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
			subHeading: 'Silakan masukkan data akun untuk melakukan pendaftaran',
			notificationMessage: {
				onSuccess: 'Berhasil',
				onError: 'Terdapat Error'
			},
			form: {
				emailLabel: 'Email',
				emailPlaceholder: 'Email',
				passwordLabel: 'Password',
				passwordPlaceholder: 'Masukkan Password',
				passwordConfirmationLabel: 'Konfirmasi Password',
				passwordConfirmationPlaceholder: 'masukkan ulang password',
				passwordHint: 'Panjang password minimal 8 karakter dan terdapat minimal 1 huruf kapital'
			},
			registerBtnLabel: 'Daftar',
			footer: {
				hasAccountLabel: 'Sudah mempunyai akun? Silakan masuk',
				cta: 'di sini',
				hasAccountLabelMobile: 'Sudah mempunyai akun?',
				loginBtnLabel: 'Masuk',
			},
			buttonPrivacy: 'Lanjut',
			buttonTnC: 'Kirim',
			infoModal: {
				heading: 'Tautan Verifikasi E-mail Tekirim',
				subHeading: 'Mohon cek ',
				subHeadingTail: 'untuk memverifikasi e-mail Anda',
				buttonLabel: 'Oke'
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
				mrHasBeenRegistered: 'Nomor rekam medis yang Anda masukkan sudah terdaftar',
				mrNotFound: 'Nomor rekam medis yang Anda masukkan belum terdaftar',
				phoneNotMatch: 'No yang Anda masukkan tidak sesuai dengan yang terdaftar di RS Pondok Indah Group',
				phoneHasBeenRegistered: 'No yang Anda masukkan telah terdaftar. Silakan ubah dengan no telepon baru',
				dobNotMatch: 'Data yang Anda masukkan tidak sesuai dengan yang terdaftar di database RS Pondok Indah',
				fieldIsEmpty: 'Harap masukkan seluruh data',
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
				patientPhoneNumberLabelInfo: 'Jika ingin melakukan penggantian data terkait, Silakan mengunjungi RS Pondok Indah terdekat',
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
				editProfileLabel: 'Ubah',
				deleteLabel: 'Hapus',
				successUpdateProfile: 'Berhasil update profil',
				successSentEmailVerif: 'Berhasil Mengirim Tautan Verifikasi E-mail, Silakan Cek Kotak Masuk E-mail Anda',
			},
			securitySetting: {
				heading: 'Pengaturan Keamanan',
				emailLabel: 'Email',
				phoneNumberLabel: 'Nomor Telepon',
				phoneNumberHint: 'Jika ingin melakukan penggantian data terkait, Silakan mengunjungi RS Pondok Indah terdekat',
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
					queueNo: 'No. Antrean:',
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
				offlineConsultation: 'Konsultasi'
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
			notSelectedHospital: 'Silakan pilih preferensi rumah sakit Anda',
			form: {
				visitDateLabel: 'Tanggal Kunjungan',
				hospitalLabel: 'Rumah sakit',
				clinicLabel: 'Klinik',
				btnLabel: {
					back: 'Kembali',
					submit: 'Lanjut'
				}
			},
			slotEmptyState: 'Silakan pilih tanggal untuk menampilkan informasi jam yang tersedia.',
			notAvailableSchedule: 'Jadwal dokter tidak tersedia di tanggal yang Anda pilih karena sudah mencapai maksimal reservasi online. Silakan pilih tanggal dan waktu lain yang tersedia di bawah ini atau hubungi call center kami untuk informasi lebih lanjut',
			callCenter: 'Hubungi Call Center',
			chooseRs: 'Pilih Rumah Sakit',
			appointmentType: 'Tipe Pertemuan',
			setSchedule: 'Atur Jadwal',
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
			labelPhoneModal: 'Silakan hubungi call center',
			visitAppOptionLabel: 'Kunjungan Tatap Muka',
			shareDoctor: {
				wateleMsg: 'Klik link berikut untuk membuat janji konsultasi dengan Dokter {speciality} terbaik untuk Anda, {doctor_name}: {link}',
				teleMsg: 'Klik link berikut untuk membuat janji konsultasi dengan Dokter {speciality} terbaik untuk Anda, {doctor_name}',
				metaDesc: 'Klik di sini untuk membuat janji konsultasi dengan Dokter {speciality} terbaik untuk Anda'
			}
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
				tailText: 'ketentuan ',
			},
			buttonPrivacy: 'Lanjut',
			buttonTnC: 'Kirim',
		},
		updatePassword: {
			heading: 'Ubah Password',
			subHeading: 'Silakan masukkan password baru anda',
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
