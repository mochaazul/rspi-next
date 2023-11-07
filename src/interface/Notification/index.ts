import { Pagination, ResponseStatus } from 'interface';

export interface NotificationState {
	notificationResponse: NotificationResponse;
	loading: boolean;
	error: ResponseStatus;
	pagination?: Pagination;
}

export interface NotificationResponse {
	notification: NotificationDetail[],
	total_unread: number,
}

export interface NotificationDetail {
	id?: number;
	category?: string;
	resource?: string;
	judul_idn?: string;
	judul_en?: string;
	isi_idn?: string;
	isi_en?: string;
	icon?: string;
	url?: string[];
	type?: boolean;
	type_desc?: string;
	email?: string;
	mr?: string;
	flag?: number;
	sent_datetime?: string;
	read_datetime?: string;
	create_datetime?: string;
}

export interface PayloadNotification {
	medical_record?: string;
	email?: string;
}