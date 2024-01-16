export default {
	combobox: {
		notFound: 'Not found any data',
		loading: 'Loading...',
	},
	dayName: {
		full: {
			monday: 'Monday',
			tuesday: 'Tuesday',
			wednesday: 'Wednesday',
			thursday: 'Thursday',
			friday: 'Friday',
			saturday: 'Saturday',
			sunday: 'Sunday',
			all: 'All'
		},
		short: {
			monday: 'Mon',
			tuesday: 'Tue',
			wednesday: 'Wed',
			thursday: 'Thu',
			friday: 'Fri',
			saturday: 'Sat',
			sunday: 'Sun',
			all: 'All'
		}
	},
	global: {
		callAmbulanceLabel: {
			heading: 'Call an Ambulance',
			subHeading: 'Please select hospital: '
		},
		share: 'Share now',
		emptyData: 'Sorry! there is no {label} at the moment'
	},
	blacklist: {
		contactUs: 'Contact Us',
	},
	modalDialog: {
		pin: {
			header: 'Enter PIN',
			subHeader: 'Please enter your PIN to continue.',
			submitBtnLabel: 'Confirm',
			pinLabel: 'PIN',
			forgotPin: 'Forgot PIN?',
			labelSuccess1: 'Please check your email',
			labelSuccess2: 'to verify the PIN change request',
			modalPinTitle: 'PIN Change Verification Link Sent',
			modalPinBtn: 'Okay'
		},
		needLogin: {
			heading: 'Please Login',
			subHeading: 'To access this page, you need to log in first',
			btnLabel: 'Login'
		},
		needLogout: {
			heading: 'Login access detected!',
			subHeading: 'A new access was logged into your account on another device.',
			desc: 'Please log out manually.',
			btnLabel: 'Log Out'
		}
	},
	navMenu: {
		home: 'Home',
		ourHospitals: 'Our Hospitals',
		centreOfExcellence: 'Center of Excellence',
		facility: 'Facilities & Services',
		career: 'Career',
		findDoctor: 'Find a Doctor',
		login: 'Login',
		register: 'Register',
		contactUs: 'Contact Us',
		loginRegister: 'Login / Register',
		bookAppointment: 'Book Appointment',
		user: {
			patientPortal: 'Patient Portal',
			patientInformation: 'Patient Information',
			logout: 'Logout'
		},
		logoutSuccess: 'You are successfully logged out'
	},
	validation: {
		emailFormat: 'Invalid email format',
		tokenValidation: {
			failed: 'Validation Failed',
			success: 'Validation Success',
			loading: 'Please Wait',
			backToLogin: 'Back to Login'
		},
		formValidation: {
			required: '{label} is a required field',
			emailNotValid: 'Email must be a valid email',
			phoneNotValid: 'Invalid phone number',
			minLength: '{label} should contain at least {minLength} characters',
			minCapitalize: '{label} must have at least {minCapitalize} capitalized character',
			exactLength: '{label} should contain {length} characters',
			notMatch: '{label} do not match',
			fileNotValid: 'This file type is invalid or unsupported',
			maxFileSize: 'This file is larger than {maxFileSize}',
			prefixPhoneNotValid: 'Phone number must precede with +62 or 021 or 08 and then followed by phone number'
		}
	},
	gender: {
		male: 'Male',
		female: 'Female'
	},
	page: {
		bookingAppointment: {
			heading: 'Book Appointment',
			validationError: 'Please fill all the data.',
			profileSelector: {
				deleteModal: {
					heading: 'Are you sure you want to delete other profile data',
					yesLabel: 'Yes',
					noLabel: 'No'
				},
				selfLabel: 'Your Profile :',
				other: 'Other\'s Profile:',
				addSelfProfile: 'Add Your Profile :',
				addOtherProfile: 'Add Other Profile :',
				form: {
					selfHeading: 'Add "Self" profile',
					otherHeading: 'Add other\'s profile',
					name: 'Name',
					email: 'E-Mail',
					phone: 'Phone',
					gender: 'Gender',
					submit: 'Submit',
					dob: 'Birth Date',
					genderLabel: {
						male: 'Male',
						female: 'Female'
					}
				},
				emptyOther: 'There is no other\'s profile.',
				emptySelf: 'Your profile is empty',
				addProfileLabelOnEmpty: 'Add',
				addNewProfile: 'Add new profile'
			},
			form: {
				selfInsurance: 'Self',
				thirdPartyInsurance: 'Third Party',
				complaintLabel: 'What\'s your concern?',
				guarantor: 'Guarantor',
				insuranceName: 'Insurance Name',
				insuranceNumber: 'Insurance Number',
				insuranceCard: {
					label: 'Insurance Card Photo (Optional)',
					front: 'Upload face side of your insurance card',
					back: 'Upload back side of your insurance card',
				},
				disclaimer: 'The provided data is correct. Registration is done for oneself. If the registration is done for someone else, consent has been obtained from the relevant party.',
				errorEmptyData: 'Make sure complaint and guarantor data are filled in',
				btnLabel: {
					back: 'Back',
					submit: 'Next'
				}
			},
			confirmationModal: {
				heading: 'Booking Confirmation',
				subHeading: 'Please check and confirm the accuracy of the following information: ',
				insuranceDataLabel: 'Insurance Data',
				insuranceNumber: 'Insurance Number',
				patientDetail: {
					heading: 'Patient Data:',
					name: 'Name:',
					birthDate: 'Date of birth:',
					phone: 'Phone Number:',
					email: 'E-Mail:',
					guarantor: 'Guarantor:'
				},
				toc: 'I confirm that all the above data is correct.',
				confirmBtnLabel: 'Confirm',
				profileIncompleteMsg: 'Your personal data is incomplete',
				redirectLabel: 'Please click the button below to be redirected to the profile page',
				redirectBtnLabel: 'Go to Profile Page'
			},
			success: {
				heading: 'Form has been successfully sent!',
				subHeading: {
					main: 'Your appointment with',
					at: 'at',
					on: 'on',
					done: 'has been successfully created.'
				},
				btnLabel: 'Ok'
			},
			bookingForm: {
				insuranceData: 'Insurance Underwriter Data'
			}
		},
		unsubscribe: {
			headingSuccess: 'Unsubscribe Successful',
			subHeadingSuccess: 'Youre now unsubscribed. Your preferences matter to us, and we appreciate your decision. If you ever change your mind, feel free to join us again. Thank you.',
			headingFailed: 'Unsubscribe Failed',
			subHeadingFailed: 'Unsubscribing from the latest news about RSPI was failed, try again',
		},
		awards: {
			heading: 'Accreditations & Awards',
			subHeading: 'We are committed to being a world-class healthcare organization. We strongly believe that operational excellence and patient safety are integral parts of meeting and exceeding our customers\' expectations.'
		},
		centerOfExcellence: {
			heading: 'Center Of Excellence',
			serviceLocation: {
				heading: 'Available at',
				hospitalName: 'RS Pondok Indah - Pondok Indah 1st Floor',
				floor: 'Floor',
				appointmentHeading: 'Appointment',
				phoneNumberHeading: 'Phone',
				operationalHourHeading: 'Operational Hours',
				informationHeading: 'Information',
				emailHeading: 'E-mail',
				relatedArticle: 'Artikel Terkait',
				readMore: 'Read More'
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
				genderOptionsLabel: {
					male: 'Male',
					female: 'Female'
				},
				titleOptionsLabel: {
					general: 'General Questions',
					specific: 'Specific Questions'
				},
				errorSubmit: 'Submit contact us has failed',
				successSubmit: 'Submit contact us has been successful',
				handleButtonModalSubmit: 'Close',
			},
			faq: {
				contactUsLabel: 'Contact Us',
				faqLongLabel: 'Frequently Asked Questions',
				heading: 'FAQ',
				subHeading: 'Frequently asked questions about services at RS Pondok Indah Group Hospitals',
				allFaqBtnLabel: 'View All FAQs',
				readMoreLabel: 'Read more',
				questions: {
					doctorSchedule: 'Where can I find RS Pondok Indah Group doctor\'s schedule?',
					assurance: 'Will RS Pondok Indah accept my insurance?',
					visitHours: 'What are the visiting hours at RS Pondok Indah Group Hospitals?',
					checkUp: 'How do I book an appointment for Executive Health Check-Up?',
					travelVaccine: 'Do RS Pondok Indah Group Hospitals  provide travel vaccination service?',
					telemedicine: 'Do Group Hospitals provide Telemedicine services?',
					maternity: 'Do RS Pondok Indah Group provide any particular maternity service?',
					homeVisit: 'Do RS Pondok Indah Group Hospitals provide home visit service?'
				},
				answers: {
					doctorSchedule: '<p><span style="font-size: 14px; color: rgb(0, 0, 0);">You can find RS Pondok Indah Group doctor&rsquo;s schedules </span><a style="text-decoration: none;" href="https://www.rspondokindah.co.id/en/find-a-doctor"><span style="font-size: 14px; color: rgb(0, 0, 0); text-decoration: underline; text-decoration-skip-ink: none;">here</span></a><span style="font-size: 14px; color: rgb(0, 0, 0);">. You can also view our doctor&rsquo;s schedule by downloading RSPI mobile app.</span></p>',
					assurance: '<p><span style="font-size: 14px; color: rgb(0, 0, 0);">RS Pondok Indah Group has collaborated with various trusted insurance companies, both domestic and overseas. Click </span><a style="text-decoration: none;" href="https://www.rspondokindah.co.id/en/perusahaan-asuransi-mitra"><span style="font-size: 14px; color: rgb(0, 0, 0); text-decoration: underline; text-decoration-skip-ink: none;">here</span></a><span style="font-size: 14px; color: rgb(0, 0, 0);"> to view our insurance partners.</span></p>',
					visitHours: `<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">Visiting hours may vary for some wards. In order to maintain the safety and comfort of all our patients, visits can only be made during certain hours and are conducted on a rotating basis.</span></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;">&nbsp;</p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><strong><span style="font-size: 14px;  color: rgb(0, 0, 0);">Visiting Hours</span></strong></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">General &amp; Newborn Wards</span></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">Morning: 11.00 AM - 1.00 PM</span></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">Evening: 6.00 PM - 8.00 PM</span></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;">&nbsp;</p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">ICU, ICCU</span></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">Morning: 11.00 AM - 12.00 PM&nbsp;&nbsp;</span></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">Evening: 6.00 PM - 8.00 PM</span></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">Only 1 visitor is allowed at any one time. Children are not allowed in these units</span></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;">&nbsp;</p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">NICU &amp; Intermediate Care</span></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">Morning: 11.00 AM - 1.00 PM</span></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">Evening: 6.00 PM - 8.00 PM</span></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">Only parents are allowed to visit. A maximum of 2 people per patient are allowed to visit at any one time.</span></p>`,
					checkUp: `<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">Our </span><a style="text-decoration: none;" href="https://www.rspondokindah.co.id/en/facilities-services/executive-health-check-up"><span style="font-size: 14px;  color: rgb(17, 85, 204); text-decoration: underline; text-decoration-skip-ink: none;">Executive Health Check Up (EHCU)</span></a><span style="font-size: 14px;  color: rgb(0, 0, 0);"> Services are available at all RSPI Group Hospitals. We provide a variety of medical checkup options that are specific to your needs, including paediatric check-ups. Please consult with our team to find out which package suits your needs.</span></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;">&nbsp;</p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">For more information or to make an appointment, please contact:</span></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;">&nbsp;</p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">Executive Health Check Up RS Pondok Indah - Pondok Indah</span></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">Information &amp; Appointment:</span></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">(62-21) 7507169, 765 7525 Ext. 2267/2318</span></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">WhatsApp:</span></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><a style="text-decoration: none;" href="https://api.whatsapp.com/send?phone=6281283112725"><span style="font-size: 14px;  color: rgb(17, 85, 204); text-decoration: underline; text-decoration-skip-ink: none;">0812-8311-2725</span></a></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">E-mail:</span></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><a style="text-decoration: none;" href="mailto:hcupondok@rspondokindah.co.id"><span style="font-size: 14px;  color: rgb(0, 0, 0); text-decoration: underline; text-decoration-skip-ink: none;">hcupondok@rspondokindah.co.id</span></a><span style="font-size: 14px;  color: rgb(0, 0, 0);">&nbsp;</span></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">[</span><a style="text-decoration: none;" href="https://storage.googleapis.com/rspi-assets-production/rspi-api/uploads/F30021-20230307125551.pdf"><span style="font-size: 14px;  color: rgb(0, 0, 0); text-decoration: underline; text-decoration-skip-ink: none;">EHCU Package - RSPI Pondok Indah</span></a><span style="font-size: 14px;  color: rgb(0, 0, 0);">]</span></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;">&nbsp;</p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">Executive Health Check Up RS Pondok Indah - Puri Indah</span></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">Information &amp; Appointment:</span></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">(62-21) 2569 5252, 2569 5200 Ext. 2100</span></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">WhatsApp:</span></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><a style="text-decoration: none;" href="https://api.whatsapp.com/send?phone=6282180887838"><span style="font-size: 14px;  color: rgb(17, 85, 204); text-decoration: underline; text-decoration-skip-ink: none;">0821-8088-7838</span></a></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">E-mail:</span></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><a style="text-decoration: none;" href="mailto:hcupuri@rspondokindah.co.id"><span style="font-size: 14px;  color: rgb(0, 0, 0); text-decoration: underline; text-decoration-skip-ink: none;">hcupuri@rspondokindah.co.id</span></a><span style="font-size: 14px;  color: rgb(0, 0, 0);">&nbsp;</span></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">[</span><a style="text-decoration: none;" href="https://storage.googleapis.com/rspi-assets-production/rspi-api/uploads/Z81201-20230307125040.pdf"><span style="font-size: 14px;  color: rgb(0, 0, 0); text-decoration: underline; text-decoration-skip-ink: none;">EHCU Package - RSPI Puri Indah</span></a><span style="font-size: 14px;  color: rgb(0, 0, 0);">]</span></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;">&nbsp;</p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">Executive Health Check Up RS Pondok Indah - Bintaro Jaya</span></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">Information &amp; Appointment:</span></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">(62-21) 8082 8888 Ext. 2301/2302</span></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">WhatsApp:</span></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><a style="text-decoration: none;" href="https://api.whatsapp.com/send?phone=628119227982"><span style="font-size: 14px;  color: rgb(17, 85, 204); text-decoration: underline; text-decoration-skip-ink: none;">0811-9227-982</span></a></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">E-mail:</span></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><a style="text-decoration: none;" href="mailto:hcubintaro@rspondokindah.co.id"><span style="font-size: 14px;  color: rgb(0, 0, 0); text-decoration: underline; text-decoration-skip-ink: none;">hcubintaro@rspondokindah.co.id</span></a></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">[</span><a style="text-decoration: none;" href="https://storage.googleapis.com/rspi-assets-production/rspi-api/uploads/M37594-20220330105057.pdf"><span style="font-size: 14px;  color: rgb(0, 0, 0); text-decoration: underline; text-decoration-skip-ink: none;">EHCU Package - RSPI Bintaro Jaya</span></a><span style="font-size: 14px;  color: rgb(0, 0, 0);">]</span> </p>`,
					travelVaccine: `<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">RS Pondok Indah Group Hospitals provide travel vaccination service and also issued international vaccination certificates or "Yellow Book".</span></p>
						<p>&nbsp;</p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">For more information, please contact:</span></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">Executive Health Check Up RS Pondok Indah - Pondok Indah</span></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">Information &amp; Appointment:</span></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">(62-21) 7507169, 765 7525 Ext. 2267/2318</span></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">WhatsApp:</span></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><a style="text-decoration: none;" href="https://api.whatsapp.com/send?phone=6281283112725"><span style="font-size: 14px;  color: rgb(17, 85, 204); text-decoration: underline; text-decoration-skip-ink: none;">0812-8311-2725</span></a></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">E-mail:</span></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><a style="text-decoration: none;" href="mailto:hcupondok@rspondokindah.co.id"><span style="font-size: 14px;  color: rgb(0, 0, 0); text-decoration: underline; text-decoration-skip-ink: none;">hcupondok@rspondokindah.co.id&nbsp;</span></a></p>
						<p>&nbsp;</p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">Executive Health Check Up RS Pondok Indah - Puri Indah</span></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">Information &amp; Appointment:</span></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">(62-21) 2569 5252, 2569 5200 Ext. 2100</span></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">WhatsApp:</span></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><a style="text-decoration: none;" href="https://api.whatsapp.com/send?phone=6282180887838"><span style="font-size: 14px;  color: rgb(17, 85, 204); text-decoration: underline; text-decoration-skip-ink: none;">0821-8088-7838</span></a></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">E-mail:</span></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><a style="text-decoration: none;" href="mailto:hcupuri@rspondokindah.co.id"><span style="font-size: 14px;  color: rgb(0, 0, 0); text-decoration: underline; text-decoration-skip-ink: none;">hcupuri@rspondokindah.co.id</span></a><span style="font-size: 14px;  color: rgb(0, 0, 0);">&nbsp;</span></p>
						<p>&nbsp;</p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">Executive Health Check Up RS Pondok Indah - Bintaro Jaya</span></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">Information &amp; Appointment:</span></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">(62-21) 8082 8888 Ext. 2301/2302</span></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">WhatsApp:</span></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><a style="text-decoration: none;" href="https://api.whatsapp.com/send?phone=628119227982"><span style="font-size: 14px;  color: rgb(17, 85, 204); text-decoration: underline; text-decoration-skip-ink: none;">0811-9227-982</span></a></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">E-mail:</span></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><a style="text-decoration: none;" href="mailto:hcubintaro@rspondokindah.co.id"><span style="font-size: 14px;  color: rgb(0, 0, 0); text-decoration: underline; text-decoration-skip-ink: none;">hcubintaro@rspondokindah.co.id </span></a></p>`,
					telemedicine: `<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px; color: rgb(0, 0, 0);">RS Pondok Indah Group provides telemedicine service. Now, you can consult with our doctors via video call more conveniently. This service uses the Zoom application on your device, so you can consult with our doctor from the comfort of your home.</span></p>
						<p>&nbsp;</p>
						<h3 style="line-height: 1.8; margin-top: 16pt; margin-bottom: 4pt;"><span style="font-size: 14pt; color: rgb(0, 0, 0); font-weight: 400;">RS Pondok Indah Group Telemedicine Mechanism</span></h3>
						<ol style="margin-top: 0px; margin-bottom: 0px; padding-inline-start: 48px;">
						<li style="font-size: 14px; color: rgb(0, 0, 0);">
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;">Make sure you are already a patient of RS Pondok Indah Group and have a medical record number</span></p>
						</li>
						<li style="font-size: 14px; color: rgb(0, 0, 0);">
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;">Contact the Call Centre of your intended RS Pondok Indah to register and/or check our doctors Telemedicine session schedule. services</span></p>
						</li>
						<li style="font-size: 14px; color: rgb(0, 0, 0);">
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;">Click on the link, which we will send via WhatsApp, to start the consultation session at the scheduled time.</span></p>
						</li>
						<li style="font-size: 14px; color: rgb(0, 0, 0);">
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;">Complete the administrative steps that we send to your email</span></p>
						</li>
						<li style="font-size: 14px; color: rgb(0, 0, 0);">
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;">Our Telemedicine service only accepts self-paid via bank transfer. Currently, we are unable to accept insurance or credit/debit card payments.</span></p>
						</li>
						<li style="font-size: 14px; color: rgb(0, 0, 0);">
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px; color: rgb(0, 0, 0);">If the doctor prescribes medication or requests a blood test, you can request for the medication to be sent to your home (for certain areas) and have the blood drawn at your home at a specified time. Please make sure you have completed the administrative process in order to receive this service.</span><span style="font-size: 14px; color: rgb(0, 0, 0); text-decoration: line-through; text-decoration-skip-ink: none;"> </span></p>
						</li>
						</ol>`,
					maternity: `<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">Awaiting the birth of your baby is a special and precious life journey for you and your partner. Understanding this, RS Pondok Indah Group presents </span><a style="text-decoration: none;" href="https://www.rspondokindah.co.id/en/promo/maternity-first"><strong><span style="font-size: 14px;  color: rgb(17, 85, 204); text-decoration: underline; text-decoration-skip-ink: none;">Maternity First</span></strong></a><span style="font-size: 14px;  color: rgb(0, 0, 0);">, which is a complete and integrated pregnancy service, to create the best experience of welcoming the baby since pregnancy, childbirth, and postpartum, including:</span></p>
						<p>&nbsp;</p>
						<ul style="margin-top: 0px; margin-bottom: 0px; padding-inline-start: 48px;">
						<li style="list-style-type: initial; font-size: 14px;  color: rgb(0, 0, 0);">
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;">Medical professionals, including obstetricians and gynaecologists, obstetricians and gynaecologists with fetomaternal subspecialty, paediatricians, and lactation counsellors.</span></p>
						</li>
						<li style="list-style-type: initial; font-size: 14px;  color: rgb(0, 0, 0);">
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;">Maternity Counsellor who can be contacted through 24-hours WhatsApp to help answer mum's questions during pregnancy</span></p>
						</li>
						<li style="list-style-type: initial; font-size: 14px;  color: rgb(0, 0, 0);">
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;">The latest medical facilities and technology, such as 4D ultrasound</span></p>
						</li>
						<li style="list-style-type: initial; font-size: 14px;  color: rgb(0, 0, 0);">
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;">Five-stars facilities in treatment rooms, delivery rooms, operating theaters, baby rooms including NICU facilities</span></p>
						</li>
						<li style="list-style-type: initial; font-size: 14px;  color: rgb(0, 0, 0);">
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;">100% support for IMD (Early Breastfeeding Initiation) and exclusive breastfeeding</span></p>
						</li>
						<li style="list-style-type: initial; font-size: 14px;  color: rgb(0, 0, 0);">
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;">Maternity Classes including pregnancy exercise classes, prenatal Yoga, and parenting classes</span></p>
						</li>
						</ul>
						<p>&nbsp;</p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">For more information, please contact:</span></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">RS Pondok Indah - Pondok Indah</span></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">Obstetrics and Gynaecology Clinic 3rd Floor</span></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">(021) 765 7525 Ext. 2</span></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">Maternity Counsellor (WhatsApp chat only): </span><a style="text-decoration: none;" href="https://api.whatsapp.com/send?phone=6281388887273"><span style="font-size: 14px;  color: rgb(0, 0, 0); text-decoration: underline; text-decoration-skip-ink: none;">081388887273</span></a></p>
						<p>&nbsp;</p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">Pondok Indah Hospital - Puri Indah</span></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">Obstetrics and Gynaecology Clinic 7th Floor</span></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">(021) 2569 5200 Ext. 2</span></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">Maternity Counsellor (WhatsApp chat only): </span><a style="text-decoration: none;" href="https://api.whatsapp.com/send?phone=6281388889096"><span style="font-size: 14px;  color: rgb(0, 0, 0); text-decoration: underline; text-decoration-skip-ink: none;">081388889096</span></a></p>
						<p>&nbsp;</p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">RS Pondok Indah - Bintaro Jaya</span></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">Obstetrics and Gynaecology Clinic 6th Floor</span></p>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">(021) 8082 8888 Ext. 2/6012</span></p>
						<p><span style="font-size: 14px;  color: rgb(0, 0, 0);">Maternity Counsellor (WhatsApp chat only): </span><a style="text-decoration: none;" href="https://api.whatsapp.com/send?phone=6281295998870"><span style="font-size: 14px;  color: rgb(0, 0, 0); text-decoration: underline; text-decoration-skip-ink: none;">081295998870</span></a></p>`,
					homeVisit: `<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;  color: rgb(0, 0, 0);">RS Pondok Indah Group Hospitals provide Home Visit service covering certain areas. Some of the services provided are as follows:</span></p>
						<ul style="margin-top: 0px; margin-bottom: 0px; padding-inline-start: 48px;">
						<li style="list-style-type: initial; font-size: 14px;  color: rgb(0, 0, 0);">
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;">Examination and consultation by general practitioner, internal medicine specialist, nutrition specialist.</span></p>
						</li>
						<li style="list-style-type: initial; font-size: 14px;  color: rgb(0, 0, 0);">
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;">NGT tube insertion/replacement</span></p>
						</li>
						<li style="list-style-type: initial; font-size: 14px;  color: rgb(0, 0, 0);">
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;">Urine catheter insertion/replacement</span></p>
						</li>
						<li style="list-style-type: initial; font-size: 14px;  color: rgb(0, 0, 0);">
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;">Stoma care</span></p>
						</li>
						<li style="list-style-type: initial; font-size: 14px;  color: rgb(0, 0, 0);">
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;">Wound care</span></p>
						</li>
						<li style="list-style-type: initial; font-size: 14px;  color: rgb(0, 0, 0);">
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;">Laboratory sampling</span></p>
						</li>
						<li style="list-style-type: initial; font-size: 14px;  color: rgb(0, 0, 0);">
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;">Bathing newborn</span></p>
						</li>
						<li style="list-style-type: initial; font-size: 14px;  color: rgb(0, 0, 0);">
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;">Vaccination</span></p>
						</li>
						<li style="list-style-type: initial; font-size: 14px;  color: rgb(0, 0, 0);">
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;">Other services</span></p>
						</li>
						</ul>
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;">&nbsp;</p>
						<h3 style="line-height: 1.8; margin-top: 16pt; margin-bottom: 4pt;"><span style="font-size: 14pt;  color: rgb(0, 0, 0); font-weight: 400;">Home Visit mechanism of Pondok Indah Hospital Group</span></h3>
						<ol style="margin-top: 0px; margin-bottom: 0px; padding-inline-start: 48px;">
						<li style="font-size: 14px;  color: rgb(0, 0, 0);">
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;">The Home Visit service applies to patients who are located around the RS Pondok Indah Group Hospitals location, within 10 km radius.</span></p>
						</li>
						<li style="font-size: 14px;  color: rgb(0, 0, 0);">
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;">Patient is already registered as a previous patient of RS Pondok Indah Hospital Group, proven by medical record number.</span></p>
						</li>
						<li style="font-size: 14px;  color: rgb(0, 0, 0);">
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;">Send a WhatsApp message to inquire our Home Visit Service at least 1 day before your intended date during working hours (08.00 AM - 05.00 PM) to:</span></p>
						</li>
						</ol>
						<ol style="margin-top: 0px; margin-bottom: 0px; padding-inline-start: 48px;">
						<li style="list-style-type: lower-alpha; font-size: 14px;  color: rgb(0, 0, 0); margin-left: 36pt;">
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;">Pondok Indah Hospital - Pondok Indah +62 821-1999-0881&nbsp;</span></p>
						</li>
						<li style="list-style-type: lower-alpha; font-size: 14px;  color: rgb(0, 0, 0); margin-left: 36pt;">
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;">Pondok Indah Hospital - Puri Indah +62 821-1999-0882</span></p>
						</li>
						<li style="list-style-type: lower-alpha; font-size: 14px;  color: rgb(0, 0, 0); margin-left: 36pt;">
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;">Pondok Indah Hospital - Bintaro Jaya +62 821-1999-0883</span></p>
						</li>
						</ol>
						<ol style="margin-top: 0px; margin-bottom: 0px; padding-inline-start: 48px;" start="4">
						<li style="font-size: 14px;  color: rgb(0, 0, 0);">
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;">Our Home Visit team will contact you to assess the services or procedures required in order to prepare accordingly.</span></p>
						</li>
						<li style="font-size: 14px;  color: rgb(0, 0, 0);">
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;">Our Home Visit Team will confirm their arrival time to the patient's home 1 day before the scheduled date.</span></p>
						</li>
						<li style="font-size: 14px;  color: rgb(0, 0, 0);">
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;">Our Home Visit Team will record the assessment, procedures, equipment and drugs used in your home and relay the information to the relevant operational units.</span></p>
						</li>
						<li style="font-size: 14px;  color: rgb(0, 0, 0);">
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;">Afterwards, our Cashier will send an invoice via WhatsApp according to the billing and send the Pondok Indah Hospital account number so that you can make payments via bank transfer.</span></p>
						</li>
						<li style="font-size: 14px;  color: rgb(0, 0, 0);">
						<p style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14px;">Our Telemedicine service only accepts self-paid via bank transfer. Currently, we are unable to accept insurance or credit/debit card payments.</span></p>
						</li>
						</ol>`,
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
						notFoundSpeciality: 'Not found any speciality',
						resetBtnLabel: 'Reset',
						submitBtnLabel: 'Find a Doctor',
						allHospital: 'Semua Rumah Sakit',
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
			},
			schedule: 'Schedule',
			more: 'More From Promo & Packages',
			info: 'Information',
			phone: 'Phone (Whatsapp Only)',
			operational: 'Operational Hours',
		},
		facilities: {
			heading: 'Facilities & Services',
			relatedNewsHeading: 'Related News',
			relatedDoctorsHeading: 'Related Doctors',
			facilitiesMenu: {
				servicesLocationHeading: 'Available At',
				phoneHeading: 'Phone',
				informationHeading: 'Information',
				emailHeading: 'E-mail',
				operationalHourHeading: 'Operational Hours',
			},
			readMoreLabel: 'Read More',
			medicalSpecialities: {
				heading: 'Medical Specialities',
				content: 'Specific health needs require specific treatment according to your condition. Our outpatient clinic services are supported by doctors from various specialties and subspecialties and medical professionals to ensure the best service for you.'
			}
		},
		news: {
			tabPillsLabel: {
				all: 'All',
				news: 'News',
				healthArticles: 'Health Articles',
				healthFirst: 'Health First'
			},
			heading: 'News and Health Articles',
			detailsBtnLabel: 'View Details',
			breadcrumbsLabel: 'News & Health Articles',
			viewDetails: 'View Details',
			searchPlaceholder: 'Search Articles'
		},
		newsDetail: {
			breadcrumbsLabel: 'News & Health Articles',
			oleh: 'By',
			downloadFilePdf: 'Download Health First magazine ',
			here: ' here',
			relatedNews: 'Related Articles',
			specialty: 'Related Doctors',
		},
		forgotPassword: {
			heading: 'Forgot Password',
			subHeading: 'Please enter your registered email, we will send a password reset link to your registered email',
			resetBtnlabel: 'Send Request',
			successMessage: {
				heading: 'Change Password Link Has Been Sent',
				subHeading: 'Check your email again',
				subHeadingTail: 'to continue the password change process',
				buttonLabel: 'Okay'
			},
			form: {
				emailLabel: 'Email',
				emailPlaceholder: 'Email'
			}
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
			subHeading: 'Please type in your 6-digit numeric PIN to access your history in more detail in the Patient Portal.',
			subHeadingReset: 'Enter your 6-digit PIN',
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
				submitBtnLabel: 'Send OTP',
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
				cta: 'here',
				notRegisteredLabelMobile: 'Don\'t have an account yet?',
				registerBtnLabel: 'Register',
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
					tail: 'to verify your email',
					successMessage: 'Successfully resent email verification'
				}
			},
			welcome: 'Welcome',
			resetEmailSuccess: 'Email address changed successfully',
			resetPasswordSuccess: 'Password changed successfully'
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
				passwordPlaceholder: 'Enter Password',
				passwordConfirmationLabel: 'Confirm Password',
				passwordConfirmationPlaceholder: 'Confirm Password',
				passwordHint: 'Minimum password length is 8 characters and should contain at least 1 capital letter'
			},
			registerBtnLabel: 'Register',
			footer: {
				hasAccountLabel: 'Already have an account? Please log in',
				cta: 'here',
				hasAccountLabelMobile: 'Already have an account?',
				loginBtnLabel: 'Login',
			},
			buttonPrivacy: 'Next',
			buttonTnC: 'Send',
			infoModal: {
				heading: 'Email Verification Link Has Been Sent',
				subHeading: 'Please check email',
				subHeadingTail: 'to verify your email',
				buttonLabel: 'Okay'
			}
		},
		registerOnboard: {
			heading: 'Welcome to Pondok Indah Hospital',
			subHeading: 'Please enter your medical record to access all the services provided by Pondok Indah Hospital',
			form: {
				mrlabel: 'Medical Record Number',
				mrPlaceholder: 'Medical Record Number',
				phoneLabel: 'Phone Number',
				phonePlaceholder: 'Phone Number',
				phoneHint: 'The phone number entered should be the registered phone number in RS Pondok Indah Group',
				birthDateLabel: 'Date of Birth',

			},
			errors: {
				mrHasBeenRegistered: 'The medical record number you entered is already registered',
				mrNotFound: 'The medical record number you entered is not yet registered',
				phoneNotMatch: 'The number you entered does not match the registered data at RS Pondok Indah Group',
				phoneHasBeenRegistered: 'Your phone number has been registered. Please change with new phone number',
				dobNotMatch: 'The data you entered does not match with the RS Pondok Indah database',
				fieldIsEmpty: 'Please fill in all data',
				sendOtpFailed: 'Send OTP failed'
			},
			submitBtnLabel: 'Save and Continue',
			mrNotAvailableBtnLabel: 'Skip'
		},
		profilePage: {
			heading: 'Patient Information',
			subHeading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas at vestibulum nulla hac consectetur feugiat.',
			loginAsLabel: 'Login as',
			updatePhotoLabel: 'Update Photo',
			uploadPhotoLabel: 'Upload Now',
			deletePhotoLabel: 'Delete Photo',
			choosePhotoLabel: 'Choose Photo',
			formatPhotoLabel: 'JPG or PNG, max size 800k',
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
				patientEmailLabelInfo: 'You can\'t change your email address if you don\'t have a medical record number',
				patientGenderMaleLabel: 'Male',
				patientGenderFemaleLabel: 'Female',
				patientPhotoProfile: 'Photo profile',
				editLabel: 'Change',
				successUpdateProfile: 'Successfully Update Profile',
			},
			securitySetting: {
				emailLabel: 'Email',
				phoneNumberLabel: 'Phone Number',
				phoneNumberHint: 'If you want to change related data, please visit the nearest RS Pondok Indah',
				passwordLabel: 'Password',
				pinLabel: 'PIN',
				saveBtnLabel: 'Save',
				cancelBtnLabel: 'Cancel',
				pinLabelInfo: 'The PIN is used to access patient portal service features and security activities on your account.',
				lastUpdatedPasswordLabel: 'Last updated on {date}'
			},
			medicalRecordLabel: 'Medical Record Information',
			medicalRecordEmptyInfo: '(You don\'t have a medical record number yet)',
			gender: {
				male: 'Male',
				female: 'Female'
			},
			errorAllInputMustBeFilled: 'Profile information must not be empty for the appointment booking form.'
		},
		patientPortal: {
			tabMenuLabel: {
				menu1: {
					heading: 'Consultation Schedule'
				},
				menu2: {
					heading: 'Medical History',
					children: [
						'Consultation',
						'Vaccines',
						'Lab Results'
					]
				}
			},
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
					header: 'Would you recommmend your doctor to your friends or family?',
					rating: [
						'Highly not recommend',
						'Highly recommend'
					],
					feedback: {
						headingLove: 'What do you love about your doctor?',
						headingImprove: 'What do you want to improve from your doctor?',
						notesInputLabel: 'Tell us more',
						notesInputPlaceholder: 'Enter a description...',
						optionalLabel: '(Optional)',
						smallNotes: 'This would help us to keep improving our service.',
						responReviewFailed: 'Review has been failed',
						responReviewSuccess: 'Review has been successfully'
					}
				},
				empty: 'You do not have any visit histories yet.',
				btnConsultationSchedule: 'Schedule a Consultation'
			},
			jadwalKunjungan: {
				label: {
					queueNo: 'Queue No.:',
					activeSchedule: 'Active Appointment',
					cancelAppointment: 'Cancel Appointment',
					empty: 'You do not have visit data at this time',
					emptyBtnCta: 'Schedule a Visit',
					visitSchedule: 'Visit Schedule',
					reschedule: 'Reschedule',
					rescheduleAgain: 'Reschedule Again',
				},
				options: [
					'Myself',
					'Other'
				],
				statusLabel: {
					C: 'Schedule Completed',
					X: 'Cancelled',
					N: 'Not Attended',
					H: 'Hold',
					T: 'Transferred',
					A: 'Arrived',
					P: 'Postponed',
					S: 'Seen Doctor',
					U: 'Arrived Not Seen',
					D: 'Departed'
				},
				teleconsultationLabel: 'Telekonsultasi',
				offlineConsultation: 'Consultation'
			},
			cancelBooking: {
				heading: 'Confirmation of Cancellation',
				warningText: 'Are you sure you want to cancel your doctor\'s appointment?',
				patientData: {
					heading: 'Patient\'s Data',
					nameLabel: 'Name : ',
					dobLabel: 'Date of Birth : ',
					phoneLabel: 'Phone : ',
					consultationScheduleLabel: 'Consultation Schedule',
					btnSubmitLabel: 'Cancel Consultation'
				}
			}
		},
		findDoctor: {
			heading: 'Find a Doctor',
			label: {
				hospital: 'Rumah sakit',
				doctorName: 'Doctor Name',
				specialty: 'Specialty',
				doctorFound: 'Doctors Found',
				seeDetail: 'Book Appointment',
				applyFilter: 'Apply',
				seeSchedule: 'See Schedule',
				closeSchedule: 'Close Schedule'
			},
		},
		doctorProfile: {
			bookAppointmentLabel: 'Book Appointment',
			scheduleHeading: 'Doctor&apos;s Schedule',
			notSelectedHospital: 'Please select your hospital preference.',
			form: {
				visitDateLabel: 'Visit Date',
				hospitalLabel: 'Hospital',
				clinicLabel: 'Clinic',
				btnLabel: {
					back: 'Back',
					submit: 'Next'
				}
			},
			slotEmptyState: 'Please select a date to display available time information.',
			notAvailableSchedule: 'The doctor\'s schedule is not available on the date you selected because it has reached the maximum online reservations. Please choose another available date and time below or contact our call center for further information.',
			callCenter: 'Contact Call Center',
			chooseRs: 'Choose Hospital',
			appointmentType: 'Apointment Type',
			setSchedule: 'Set Schedule',
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
			labelPhoneModal: 'Please contact the call center',
			visitAppOptionLabel: 'Visit in Person',
			shareDoctor: {
				wateleMsg: 'Click this link to create appointment with your best {speciality}, {doctor_name}: {link}',
				teleMsg: 'Click this link to create appointment with your best {speciality}, {doctor_name}',
				metaDesc: 'Click here to create appointment with your best {speciality}',
			}
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
			subscribeLabel: 'STAY UPDATED WITH US',
			subscribeDescription: 'Register your e-mail to subscribe to the newsletter and get the latest information from RS Pondok Indah Group.',
			subscribePlaceholder: 'Enter your email address',
			subscribeSubmit: 'Subscribe',
			errorSubs: 'The subscription process failed',
			successSubs: 'The subscription process successful',
			handleButtonModalSubmit: 'Close',
		},
		medicalRecordReminder: {
			heading: 'Get Access to Your Medical Visit Information',
			btnLabel: 'Fill in Medical Record Data',
			tooltipLabel: 'Make sure you have booked an appointment and visited the nearest RSPI.'
		},
		topNav: {
			welcome: 'Welcome',
			contactUs: 'Contact Us'
		},
		privacyPolicy: {
			agreementStatement: {
				preText: 'I',
				boldText: 'agree',
				tailText: 'to the ',
			},
			buttonPrivacy: 'Next',
			buttonTnC: 'Send',
		},
		updatePassword: {
			heading: 'Change Password',
			subHeading: 'Please enter your new password',
			resetForm: {
				oldPasswordLabel: 'Old Password',
				oldPasswordPlaceHolder: 'Please enter your old password',
				newPasswordLabel: 'New Password',
				newPasswordPlaceHolder: 'Please enter your new password',
				newPasswordConfirmationLabel: 'Confirm Password',
				newPasswordConfirmationPlaceholder: 'Confirm your new password',
				resetBtnLabel: 'Change Password'
			},
			forgotPasswordLabel: 'Forgot Password?',
			lastUpdatedPasswordLabel: 'Last updated on {date}'
		}
	}
} as const;
