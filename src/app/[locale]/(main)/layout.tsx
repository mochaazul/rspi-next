
import { headers } from 'next/headers';

import { appStage } from '@/config';

import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';

import MedicalRecordReminder from '@/components/MedicalRecordReminder';
import CallForAmbulance from '@/components/CallForAmbulance';
import DevTools from '@/components/DevTools';

import '@/styles/globals.css';
import {
  OutletStyle,
  OutletStyleType,
  PanelH1,
  PanelH2,
  PanelH3,
  PanelH4,
  PanelV1
} from './style';

import { 
  centerOfExcellenceFetch,
  facilityServicesFetch,
  marAllReadNotif,
  notificationResponseFetch,
  footersFetch,
  hospitalsFetch
} from './helpers';

const blacklistedRoute = [
  '/patient-portal',
  '/doctor-detail',
  '/book-appointment'
];

export default async function RootLayout({
  props,
  children,
}: {
  children: React.ReactNode,
  props: {
    containerStyle?: OutletStyleType;
    footerShow?: boolean;
  };
}) {
  
  const pathname = children?.props?.childProp?.segment;
  const shouldRenderReminder = !blacklistedRoute.some(route => pathname.includes(route));

  const hospitals = await hospitalsFetch();
  const footers = await footersFetch();
  const centerOfExcellence = await centerOfExcellenceFetch();
  const facilityServices = await facilityServicesFetch();
  const notificationResponse = await notificationResponseFetch();
  
  return (
    <>
      <Header 
        hospitalData = { hospitals.data }
        centerOfExcellenceData = {centerOfExcellence.data}
        facilityServicesData = {facilityServices.data}
        notificationResponseData = {notificationResponse.data}
        marAllReadNotifFunc = { marAllReadNotif }
      />
      { children }

      { props?.footerShow !== false &&
        <Footer footerData = { footers.data } />
      }
      { props?.footerShow !== false &&
        <CallForAmbulance hospitalData = { hospitals.data } />
      }
      { appStage !== 'prod' &&
        <DevTools />
      }
      { shouldRenderReminder &&
        <MedicalRecordReminder />
      }
    </>
  );
}

export {
  PanelH1,
  PanelH2,
  PanelH3,
  PanelH4,
  PanelV1,
}
