import { Pagination, ResponseStatus } from 'interface/network';

export interface I_SpecialitiesResponse {
  id: number
  name: string
  sub_specialities: string
  description: string
  created_date: string
  updated_date: string
}

export interface I_Specialities {
  name: string
  sub_specialities: I_SubSpecialities[]
}

export interface I_SubSpecialities {
  id: number
  name: string
  sub_specialities: string
  description: string
  created_date: string
  updated_date: string
}

export interface I_SpecialitiesState{
  specialities: I_Specialities[]
  loading: boolean;
  error: ResponseStatus;
  pagination?: Pagination;
}