
// import { usePathname } from 'next/navigation'
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
import { usePathname } from 'next/navigation';

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
  // const pathname = usePathname();
  // const shouldRenderReminder = !blacklistedRoute.some(route => pathname.includes(route));
  const shouldRenderReminder = true;
  const hospitals = hospitalsFetch();
  const footers = footersFetch();
  const centerOfExcellence = centerOfExcellenceFetch();
  const facilityServices = facilityServicesFetch();
  const notificationResponse = notificationResponseFetch();
  
  return (
    <>
      <Header 
        hospitalData = { (await hospitals).data }
        centerOfExcellenceData = {(await centerOfExcellence).data}
        facilityServicesData = {(await facilityServices).data}
        notificationResponseData = {(await notificationResponse).data}
        marAllReadNotifFunc = { marAllReadNotif }
      />
      { children }

      { props?.footerShow !== false &&
        <Footer footerData = { (await footers).data } />
      }
      { props?.footerShow !== false &&
        <CallForAmbulance hospitalData = { (await hospitals).data } />
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