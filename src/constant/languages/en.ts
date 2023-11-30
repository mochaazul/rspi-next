export default {
	dayName: {
		full: {
			monday: 'Monday',
			tuesday: 'Tuesday',
			wednesday: 'Wednesday',
			thursday: 'Thursday',
			friday: 'Friday',
			saturday: 'Saturday',
			sunday: 'Sunday'
		},
		short: {
			monday: 'Mon',
			tuesday: 'Tue',
			wednesday: 'Wed',
			thursday: 'Thu',
			friday: 'Fri',
			saturday: 'Sat',
			sunday: 'Sun'
		}
	},
	modalDialog: {
		pin: {
			header: 'Enter PIN',
			subHeader: 'Please enter your PIN to continue.',
			submitBtnLabel: 'Confirm'
		}
	},
	validation: {
		emailFormat: 'Invalid email format',
		tokenValidation: {
			failed: 'Validation Failed',
			success: 'Validation Success',
			loading: 'Please Wait'
		}
	},
	page: {
		unsubscribe: {
			headingSuccess: 'Unsubscribe was successful',
			subHeadingSuccess: 'Unsubscribing from the latest news about RSPI was successful, hopefully we can meet again',
			headingFailed: 'Unsubscribe was failed',
			subHeadingFailed: 'Unsubscribing from the latest news about RSPI was failed, try again',
		},
		awards: {
			heading: 'Accreditations & Awards',
			subHeading: 'We are committed to being a world-class healthcare organization. We strongly believe that operational excellence and patient safety are integral parts of meeting and exceeding our customers\' expectations.'
		},
		centerOfExcellence: {
			serviceLocation: {
				heading: 'Available at',
				hospitalName: 'RS Pondok Indah - Pondok Indah 1st Floor',
				appointmentHeading: 'Appointment',
				phoneNumberHeading: 'Phone',
				operationalHourHeading: 'Operational Hours',
				informationHeading: 'Information',
				emailHeading: 'E-mail',
				relatedArticle: 'Artikel Terkait'
			}
		},
		contactUs: {
			heading: 'Contact Us',
			subHeading: 'Please fill your personal information and write your queries in the form below. Our Patient Relations will be pleased to help you soon.',
			contactForm: {
				heading: 'Contact Us',
				subHeading: 'Please fill your personal information and write your queries in the form below.',
				labels: {
					hospital: 'Hospital',
					fullName: 'Full Name',
					gender: 'Gender',
					email: 'E-mail',
					phone: 'Phone Number',
					subject: 'Subject',
					notes: 'Notes'
				},
				placeholder: {
					hospital: 'Hospital',
					fullName: 'Full Name',
					gender: 'Gender',
					email: 'E-mail',
					phone: 'Phone Number',
					subject: 'Subject',
					notes: 'Enter your message here...'
				},
				submitBtnLabel: 'Send Message',
				form: {
					allHospitalLabel: 'All RSPI Hospitals'
				},
				errorSubmit: 'Submit contact us has failed',
				successSubmit: 'Submit contact us has been successful',
				handleButtonModalSubmit: 'Close',
			},
			faq: {
				heading: 'FAQ',
				subHeading: 'Frequently Asked Questions about our services',
				allFaqBtnLabel: 'View All FAQs',
				readMoreLabel: 'Read more',
				questions: {
					doctorSchedule: 'Where do I find out the doctors schedule in Pondok Indah Hospital?',
					assurance: 'Can my insurance be used in Pondok Indah Hospital?',
					visitHours: 'Is there any visiting hours for patients in Pondok Indah Hospital?',
					checkUp: 'How can I make an appointment for Health Check Up?',
					travelVaccine: 'Does Pondok Indah Hospital have travel vaccination service?',
					telemedicine: 'Does Pondok Indah Hospital provide telemedicine?',
					maternity: 'Is there any information in regard to maternity or delivery in Pondok Indah Hospital?'
				},
				answers: {
					doctorSchedule: 'You can find all the RS Pondok Indah doctors schedule through (link) or you can also access the schedule through RSPI Mobile (our mobile apps).',
					assurance: 'RS Pondok Indah Group is in cooperation with various leading national and international insurance companies to ensure the ease accessing our health services. Find out the partner insurance companies we collaborate with through this link (link: perusahaan asuransi mitra).',
					visitHours: `Every unit has its own visiting hour policy. To ensure the quiet and comfort of patients and other patients, visits are permissible only during the visiting hours and conducted by turns.
					<div className='mt-[15px]' />
					Visiting Hours
					<div className='mt-[15px]' />
					General Ward & Baby Room
					<div className='flex'>
						<div className='grid grid-cols-2'>
							<div>Noon: 11 AM - 1 PM</div>
							<div>Afternoon: 6 PM - 8 PM</div>
						</div>
					</div>
					<div className='mt-[15px]' />
					ICU, ICCU, & NICU
					<div className='flex'>
						<div className='grid grid-cols-2'>
							<div>Noon: 11 AM - 12 PM</div>
							<div>Afternoon: 6 PM - 7 PM</div>
						</div>
					</div>
					Only one visitor is permitted at a time
					Children are not allowed to be in this unit
					<div className='mt-[15px]' />
					Baby Intermediate Room
					<div className='flex'>
						<div className='grid grid-cols-2'>
							<div>Noon: 11 AM - 1 PM</div>
							<div>Afternoon: 6 PM - 8 PM</div>
						</div>
					</div>
					Only parents are allowed to visit
					Maximum of 2 visitors for each patient are allowed to visit at the same time`,
					checkUp: `A comprehensive medical check-up package is available at the three branches Executive Health Check-Up of Pondok Indah Hospital Group. Variety of medical check up packages are available including those for children. Please consult with our team for a package that suits your needs. 
					<div className='mt-[15px]' />
					<p>For more information and make an appointment, please contact: </p>
					Executive Health Check Up RS Pondok Indah - Pondok Indah
					<div className='flex'>
						<div className='grid grid-cols-[1fr_10px_1fr] xxl:w-[50%] md:w-[75%] w-full items-center'>
							<div>Information & Appointment</div>
							<div>:</div>
							<div>(62-21) 7507169, 765 7525 Ext. 2267/2318</div>
							<div>WhatsApp</div>
							<div>:</div>
							<div>0812-8311-2725</div>
							<div>E-mail</div>
							<div>:</div>
							<div>hcupondok@rspondokindah.co.id</div>
						</div>
					</div>
					<a href='#'>[link paket EHCU]</a>
					<div className='mt-[15px]' />
					Executive Health Check Up RS Pondok Indah - Puri Indah
					<div className='flex'>
						<div className='grid grid-cols-[1fr_10px_1fr] xxl:w-[50%] md:w-[75%] w-full items-center'>
							<div>Information & Appointment</div>
							<div>:</div>
							<div>(62-21) 2569 5252, 2569 5200 Ext. 2100</div>
							<div>WhatsApp</div>
							<div>:</div>
							<div>0821-8088-7838</div>
							<div>E-mail</div>
							<div>:</div>
							<div>hcupuri@rspondokindah.co.id</div>
						</div>
					</div>
					<a href='#'>[link paket EHCU]</a>
					<div className='mt-[15px]' />
					Executive Health Check Up RS Pondok Indah - Bintaro Jaya
					<div className='flex'>
						<div className='grid grid-cols-[1fr_10px_1fr] xxl:w-[50%] md:w-[75%] w-full items-center'>
							<div>Information & Appointment</div>
							<div>:</div>
							<div>(62-21) 8082 8888 Ext. 2301/2302</div>
							<div>WhatsApp</div>
							<div>:</div>
							<div>0811-9227-982</div>
							<div>E-mail</div>
							<div>:</div>
							<div>hcubintaro@rspondokindah.co.id</div>
						</div>
					</div>
					<a href='#'>[link paket EHCU]</a>`,
					travelVaccine: `Pondok Indah Hospital Group has travel vaccination service. We also provide the issue of International Vaccine Certification (ICV) or popularly known as yellow card.
					<div className='mt-[15px]' />
					<p>For more information, please contact:</p>
					Executive Health Check Up RS Pondok Indah - Pondok Indah
					<div className='flex'>
						<div className='grid grid-cols-[1fr_10px_1fr] xxl:w-[50%] md:w-[75%] w-full items-center'>
							<div>Information & Appointment:</div>
							<div>:</div>
							<div>(62-21) 7507169, 765 7525 Ext. 2267/2318</div>
							<div>WhatsApp</div>
							<div>:</div>
							<div>0812-8311-2725</div>
							<div>E-mail</div>
							<div>:</div>
							<div>hcupondok@rspondokindah.co.id</div>
						</div>
					</div>
					<div className='mt-[15px]' />
					Executive Health Check Up RS Pondok Indah - Puri Indah
					<div className='flex'>
						<div className='grid grid-cols-[1fr_10px_1fr] xxl:w-[50%] md:w-[75%] w-full items-center'>
							<div>Information & Appointment:</div>
							<div>:</div>
							<div>(62-21) 2569 5252, 2569 5200 Ext. 2100</div>
							<div>WhatsApp</div>
							<div>:</div>
							<div>0821-8088-7838</div>
							<div>E-mail</div>
							<div>:</div>
							<div>hcupuri@rspondokindah.co.id</div>
						</div>
					</div>
					<div className='mt-[15px]' />
					Executive Health Check Up RS Pondok Indah - Bintaro Jaya
					<div className='flex'>
						<div className='grid grid-cols-[1fr_10px_1fr] xxl:w-[50%] md:w-[75%] w-full items-center'>
							<div>Information & Appointment:</div>
							<div>:</div>
							<div>(62-21) 8082 8888 Ext. 2301/2302</div>
							<div>WhatsApp</div>
							<div>:</div>
							<div>0811-9227-982</div>
							<div>E-mail</div>
							<div>:</div>
							<div>hcubintaro@rspondokindah.co.id</div>
						</div>
					</div>`,
					telemedicine: `RS Pondok Indah Group has Telemedicine or teleconsultation service. Now, you can consult with our doctors through video call anywhere you are. This service uses Zoom application in your gadget, so there is no longer a need to go outside to consult with our doctors.
					<div className='mt-[15px]' />
					Telemedicine Pondok Indah Hospital Group Mechanism
					<ol className='list-decimal pl-4'>
						<li>Please ensure that you are already Pondok Indah Hospital Group&apos;s patient with medical record number</li>
						<li>Contact Pondok Indah Hospital Group Call Centre to make a Telemedicine appointment or to check our  doctors’ schedule that provides telemedicine services</li>
						<li>Click the <a href='#'>link</a> we send to your WhatsApp number to start the consultation session at the agreed time</li>
						<li>Finish the administration processes that we send to your <a href='#'>email</a></li>
						<li>This telemedicine service can only be done with self-paid system through bank transfer. We have yet to accept payment through insurance or debit/credit card</li>
						<li style={ { color: 'red' } }>In the case of doctors prescribing medicines or requesting blood check for you, you can retrieve the medicine and conduct blood sample extraction by taking advantage of our drive-thru service at the agreed time after you finish the administration processes.We also provide medicine delivery service to specific locations</li>
					</ol>`,
					maternity: `Expecting the birth of your bundle of joy is a precious and special moment in every couple’s life. Cherishing this life event, Pondok Indah Hospital Group presents Maternity First, a complete and integrated maternity service, to create the best experience for welcoming your bundle of joy, start from pregnancy, during the labor, and after birth, which includes:
					<div className='mt-[15px]' />

					<ul className='list-disc pl-5'>
						<li>Professional medical services, including obstetrics and gynecology doctor, fetomaternal consultant obgyn doctor, pediatrician, and lactation consultant</li>
						<li>Maternity Counselor that can be contacted 24 hours via WhatsApp to answer every expecting mother’s questions during the pregnancy</li>
						<li>The latest medical technology and facilities, such as 4D USG</li>
						<li>Five-stars facilities in the ward, delivery room, operating room, baby room that includes NICU facilities</li>
						<li>100% support for exclusive breastfeeding and early initiation of breastfeeding (EIB)</li>
						<li>Maternity Classes, including pregnancy exercise class, prenatal Yoga class, and parenting class</li>
					</ul>

					<div className='mt-[15px]' />
					<p>For more information, please contact:</p>
					<div className='mt-[15px]' />
					<p>RS Pondok Indah – Pondok Indah</p>
					<p>Obstetrics and Gynecology Clinic, 3rd Floor</p>
					<p>(021) 765 7525 Ext. 2</p>
					<p>Maternity Counselor (WhatsApp chat only): 081388887273</p>

					<div className='mt-[15px]' />
					<p>RS Pondok Indah - Puri Indah</p>
					<p>Obstetrics and Gynecology Clinic, 7th Floor</p>
					<p>(021) 2569 5200 Ext. 2</p>
					<p>Maternity Counselor (WhatsApp chat only): 081388889096</p>

					<div className='mt-[15px]' />
					<p>RS Pondok Indah – Bintaro Jaya</p>
					<p>Obstetrics and Gynecology Clinic, 6th Floor</p>
					<p>(021) 8082 8888 Ext. 2/6012</p>
					<p>Maternity Counselor (WhatsApp chat only): 081295998870</p>`
				}
			},
			location: {
				heading: 'Our Hospital',
				subHeading: 'Giving the best service through professional medical team, adoption of the latest medical technologies, and integrated digital information system. Find out more here.',
			}
		},
		landingPage: {
			services: {
				tabsLabel: ['Find a Doctor'],
				findDoctor: {
					form: {
						resetBtnLabel: 'Reset',
						submitBtnLabel: 'Find a Doctor',
						labels: {
							doctorName: 'Doctor Name',
							hospital: 'Hospital',
							speciality: 'Specialty',
							date: 'Preferred Day'
						},
						placeholder: {
							doctorName: 'All doctors',
							hospital: 'All RSPI Branches',
							speciality: 'Specialty',
							date: 'Choose Preferred Date',
						}
					}
				},
				telemedicine: {
					form: {
						resetBtnLabel: 'Reset',
						submitBtnLabel: 'Find a Doctor',
						labels: {
							doctorName: 'Doctor Name (Telemedicine)',
							hospital: 'Hospital',
							speciality: 'Specialty',
							date: 'Preferred Day'
						},
						placeholder: {
							doctorName: 'Doctor Name',
							hospital: 'All RSPI Branches',
							speciality: 'Specialty',
						}
					}
				}
			},
			centerOfExcelence: {
				heading: 'Center of Excellence',
				subHeading: 'Explore various information about our services here.',
				allItemBtnLabel: 'See All Center of Excellence',
				cardItem: {
					readMoreLabel: 'Read More'
				},
				createAppointmentBtnLabel: 'Book Appointment'
			},
			facilitiesServices: {
				heading: 'Facilities & Services',
				subHeading: 'Providing leading integrated healthcare services. Supported by professional medical personnel, the latest medical technology adoption, and more efficient digital information systems. Learn more here.',
				allItemlabel: 'See All Facilities & Services'
			},
			promoPackages: {
				heading: 'Promo and Packages',
				subHeading: 'Various special offers for you.',
				viewDetailsBtnLabel: 'View Details',
				allItemBtnLabel: 'See All promo and Packages',
			},
			newsHealthArticle: {
				heading: 'News, Health Articles & Magazine',
				allItemBtnLabel: 'See All News & Health Articles',
				readMoreBtnLabel: 'Read More'
			},
			customerReview: {
				heading: 'Inspirational Stories from Our Patients',
				allPpatientHistoryBtnLabel: 'Read All Patient Stories'
			},
			accreditationsAndAwards: {
				heading: 'Accreditations & Awards',
				subHeading: 'Our various best achievements as a commitment to always provide the best healthcare services, prioritizing your safety and comfort.',
				readMoreBtnLabel: 'See Our Awards in Detail'
			},
			mobileAppBanner: {
				heading: 'Access Our Services From Your Mobile.',
				subHeading: 'This is the RSPI Mobile application. An integrated application to facilitate your access to our services. All information about our services is here.'
			},
		},
		promoPage: {
			heading: 'Promo & Packages',
			hospitalSelectionLabel: 'Hospital location',
			allHospitalLabel: 'All Hospital',
			tabPillsLabel: {
				allLabel: 'All',
				eventLabel: 'Events',
				classesLabel: 'Classes',
				promoLabel: 'Promo'
			},
			promoItem: {
				detailsBtnLabel: 'View Details'
			}
		},
		facilities: {
			relatedNewsHeading: 'Related News',
			relatedDoctorsHeading: 'Related Doctors',
			facilitiesMenu: {
				servicesLocationHeading: 'Available At',
				phoneHeading: 'Phone',
				informationHeading: 'Information',
				emailHeading: 'E-mail',
				operationalHourHeading: 'Operational Hours',
			},
			readMoreLabel: 'Read More'
		},
		news: {
			tabPillsLabel: {
				all: 'All',
				news: 'News',
				healthArticles: 'Health Articles',
				healthFirst: 'Health First'
			},
			heading: 'News and Health Articles',
			detailsBtnLabel: 'View Details'
		},
		newsDetail: {
			oleh: 'By',
		},
		forgotPassword: {
			heading: 'Forgot Password',
			subHeading: 'Please enter your registered email, we will send a password reset link to your registered email',
			resetBtnlabel: 'Send Request'
		},
		resetPassword: {
			heading: 'Change Password',
			subHeading: 'Please enter your registered account data in our system',
			resetForm: {
				oldPasswordLabel: 'Old Password',
				oldPasswordPlaceHolder: 'Please enter your old password',
				newPasswordLabel: 'New Password',
				newPasswordPlaceHolder: 'Please enter your new password',
				newPasswordConfirmationLabel: 'Confirm Password',
				newPasswordConfirmationPlaceholder: 'Confirm your new password',
				resetBtnLabel: 'Reset Password'
			},
		},
		resetEmail: {
			heading: 'Change Email',
			subHeading: 'Please enter your registered account data in our system',
			resetForm: {
				oldEmailLabel: 'Old Email',
				oldEmailPlaceHolder: 'Please enter your old Email',
				newEmailLabel: 'New Email',
				newEmailPlaceHolder: 'Please enter your new Email',
				newEmailConfirmationLabel: 'Confirm Email',
				newEmailConfirmationPlaceholder: 'Confirm your new Email',
				resetBtnLabel: 'Reset Email'
			},
		},
		pinPage: {
			heading: 'Create New PIN',
			headingReset: 'Change PIN',
			subHeading: 'Please create your 6-digit PIN',
			notification: {
				onSuccessMsg: 'Successfully created PIN',
				onErrorMsg: 'Error occurred',
				onSuccessMsgUpdatePin: 'Successfully update PIN',
			},
			form: {
				pinFieldLabel: 'PIN',
				pinConfirmLabel: 'Confirm PIN',
				submitBtnLabel: {
					loading: 'Loading',
					default: 'Save PIN'
				},
				changeBtnLabel: {
					loading: 'Loading',
					default: 'Change PIN'
				}
			}
		},
		otpVerification: {
			heading: 'Enter Verification Code',
			subHeading: 'Enter the code sent via SMS to your mobile number',
			resendOtp: 'Resend OTP',
			resendWarn: 'You have 3 request OTP attempt.',
			form: {
				otpFieldLabel: 'OTP',
				submitBtnLabel: 'Submit OTP',
				backBtnlabel: 'Back to Home'
			}

		},
		loginPage: {
			heading: 'Welcome',
			subHeading: 'Please enter your registered account data in our system',
			forgotPasswordLabel: 'Forgot Password?',
			loginBtnLabel: 'Login',
			footer: {
				notRegisteredLabel: 'Don\'t have an account yet? Please register',
				cta: 'here'
			},
			form: {
				emailLabel: 'Email',
				emailPlaceholder: 'Email',
				passwordLabel: 'Password',
				passwordPlaceholder: 'Password'
			},
			notificationMessage: {
				emailNotVerified: {
					heading: 'Your email is not verified. Please',
					cta: 'Click here',
					tail: 'to verify your email'
				}
			}
		},
		registerPage: {
			heading: 'Welcome',
			subHeading: 'Please enter your account information to register',
			notificationMessage: {
				onSuccess: 'Success',
				onError: 'Error occurred'
			},
			form: {
				emailLabel: 'Email',
				emailPlaceholder: 'Email',
				passwordLabel: 'Password',
				pasaswordPlaceholder: 'Enter Password',
				passwordConfirmationLabel: 'Confirm Password',
				passwordConfirmationPlaceholder: 'Confirm Password',
				passwordHint: 'Minimum password length is 8 characters and should contain at least 1 capital letter'
			},
			registerBtnLabel: 'Register',
			footer: {
				hasAccountLabel: 'Already have an account? Please log in',
				cta: 'here'
			},
			buttonPrivacy: 'Next',
			buttonTnC: 'Send',
		},
		registerOnboard: {
			heading: 'Welcome to RS. Pondok Indah',
			subHeading: 'Please enter your medical record to access all the services provided by RS. Pondok Indah. Your account information will be securely stored by us',
			form: {
				mrlabel: 'Medical Record Number',
				mrPlaceholder: 'Medical Record Number',
				phoneLabel: 'Phone Number',
				phonePlaceholder: 'Phone Number',
				phoneHint: 'The phone number entered should be the registered phone number in RS Pondok Indah Group',
				birthDateLabel: 'Date of Birth',

			},
			errors: {
				mrHasBeenRegistered: 'Nomor rekam medis yang Anda masukan sudah terdaftar',
				mrNotFound: 'Nomor rekam medis yang Anda masukkan belum terdaftar',
				phoneNotMatch: 'No yang Anda masukkan tidak sesuai dengan yang terdaftar di RS Pondok Indah Group',
				dobNotMatch: 'Data yang Anda masukkan tidak sesuai dengan yang terdaftar di database RS Pondok Indah',
				fieldIsEmpty: 'Harap masukan seluruh data'
			},
			submitBtnLabel: 'Save and Continue',
			mrNotAvailableBtnLabel: 'Skip'
		},
		profilePage: {
			heading: 'User Information',
			subHeading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas at vestibulum nulla hac consectetur feugiat.',
			loginAsLabel: 'Login as',
			updatePhotoLabel: 'Update Photo',
			uploadPhotoLabel: 'Upload Now',
			deletePhotoLabel: 'Delete Photo',
			choosePhotoLabel: 'Choose Photo',
			formatPhotoLabel: 'JPG or PNG, maks size 800k',
			profileLabel: 'Profile',
			securitySettingLabel: 'Security Setting',
			profileDetail: {
				patientIdLabel: 'Patient ID',
				lastVisitedHospitalLabel: 'Last Visited Hospital',
				lastVisitedDateLabel: 'Last Visited Date',
				patientNameLabel: 'Name',
				patientNamePlaceholder: 'Name',
				patientBirthDateLabel: 'Birth Date',
				patientBirthDatePlaceholder: 'Birth Date',
				patientGenderLabel: 'Gender',
				patientGenderPlaceholder: 'Gender',
				patientMedicalNumber: 'Medical Record Number',
				patientMedicalNumberPlaceholder: 'Medical Record Number',
				patientPhoneNumber: 'Phone Number',
				patientPhoneNumberPlaceholder: 'Phone Number',
				patientPhoneNumberLabelInfo: 'If you want to change your data, please visit the nearest Pondok Indah Hospital',
				patientOldEmail: 'Old Email',
				patientOldEmailPlaceHolder: 'Old Email',
				patientNewEmail: 'New Email',
				patientNewEmailPlaceHolder: 'New Email',
				patientEmail: 'Email Address',
				patientEmailPlaceholder: 'Email',
				patientEmailLabelInfo: 'You can\'t change your email address if you don\'t have a medical record number'
			},
			securitySetting: {
				emailLabel: 'Email',
				phoneNumberLabel: 'Phone Number',
				phoneNumberHint: 'If you want to change related data, please visit the nearest RS Pondok Indah',
				passwordLabel: 'Password',
				pinLabel: 'PIN',
				saveBtnLabel: 'Save',
				cancelBtnLabel: 'Cancel'
			},
			medicalRecordLabel: 'Medical Record Information',
			medicalRecordEmptyInfo: '(You don\'t have a medical record number yet)'
		},
		patientPortal: {
			tabMenuLabel: [
				'Appointment Schedule',
				'Visit History',
				'Vaccine History',
				'Laboratory Test History'
			],
			riwayatVaksin: {
				warning: 'Disclaimer: All vaccines used in the vaccination process are from RSPI',
				tableMenuLable: {
					vaccineType: 'Vaccine Type',
					vaccineName: 'Vaccine Name',
					vaccineDate: 'Vaccination Date'
				},
				empty: 'You do not have any vaccine histories yet.'
			},
			riwayatLab: {
				warning: 'Notes: The default PIN used to open the report file is the patient\'s date of birth in the following format -> DD/MM/YYYY',
				tableMenuLable: {
					hospital: 'Hospital',
					date: 'Date',
					doctor: 'Doctor',
					viewReport: 'Download'
				},
				empty: 'You do not have any lab histories yet.'

			},
			riwayatKunjungan: {
				label: {
					didNotCome: 'Patient did not come',
					canceledAppointment: 'Canceled',
					doneAppointment: 'Appointment Done',
					seeDetail: 'See Details',
					recommendDoctor: 'Would you recommend your doctor?'
				},
				recommendDoctorModal: {
					header: 'Would you recommmend your doctor to your friends or family ?'
				},
				empty: 'You do not have any visit histories yet.'
			},
			jadwalKunjungan: {
				label: {
					queueNo: 'Queue Number',
					activeSchedule: 'Active Appointment',
					cancelAppointment: 'Cancel Appointment',
					empty: 'You do not have visit data at this time',
				}
			}
		},
		findDoctor: {
			heading: 'Find a Doctor',
			label: {
				doctorName: 'Doctor Name',
				specialty: 'Specialty',
				doctorFound: 'Doctors Found',
				seeDetail: 'Book Appointment'
			},
		},
		doctorProfile: {
			scheduleHeading: 'Doctor&apos;s Schedule',
			form: {
				visitDateLabel: 'Visit Date',
				hospitalLabel: 'Hospital',
				clinicLabel: 'Clinic'
			},
			slotEmptyState: 'Please select a date to display available time information.',
			notAvailableSchedule: 'The doctor\'s schedule is not available on the date you selected because it has reached the maximum online reservations. Please choose another available date and time below or contact our call center for further information.',
			callCenter: 'Contact Call Center',
			chooseRs: 'Choose Hospital',
			available: 'Available',
			limitedSlot: 'Limited Slot',
			noSchedule: 'Not Available',
			successTitle: 'The form has been successfully submitted!',
			successBody: 'Your Appointment with ',
			in: 'in',
			at: 'at',
			hasSuccess: 'has been success',
			asuransiCard: 'Insurance Card Photo (Optional)',
			asuransiCardBack: 'Upload a rear view photo',
			asuransiCardFront: 'Upload a photo of the front view',
		},
		footer: {
			visitorInfo: {
				hospitalDirectory: 'Hospital Directory',
				partnerInsurance: 'Partner Insurance Company',
				paymentAdministration: 'Payment Administration',
			},
			patientInfo: {
				visitHoursPolicy: 'Visiting Hours & Policies',
				ourEffort: 'Our Efforts to Keep You Safe'
			},
			ourHospitalsLabel: 'OUR HOSPITALS',
			ourCompanyLabel: 'OUR COMPANY',
			visitorPatientLabel: 'VISITOR & PATIENT INFORMATION',
			followUsLabel: 'FOLLOW US',
			getRSPIMobileLabel: 'GET RSPI MOBILE',
			subscribeLabel: 'Stay Updated With Us',
			subscribeDescription: 'Register your e-mail to subscribe to the newsletter and get the latest information from RS Pondok Indah Group.'
		},
		medicalRecordReminder: {
			heading: 'Get Access to Your Medical Visit Information',
			btnLabel: 'Fill in Medical Record Data',
			tooltipLabel: 'Make sure you have booked an appointment and visited the nearest RSPI.'
		},
		topNav: {
			welcome: 'Welcome'
		}
	}
} as const;
