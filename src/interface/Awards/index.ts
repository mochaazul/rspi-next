import { Pagination, ResponseStatus } from 'interface';

export interface AwardsState {
  awards: AwardsDetail[];
  loading: boolean;
  error: ResponseStatus;
  pagination?: Pagination;
}

export interface AwardsDetail {
  id?: number;
  title?: string;
  description?: string;
  img_url?: string;
  is_publish?: boolean;
  created_date?: string;
  updated_date?: string;
}

export interface PayloadAwards {
  id?: number;
  title?: string;
  description?: string;
  img_url?: string;
  is_publish?: boolean;
  created_date?: string;
  updated_date?: string;
}