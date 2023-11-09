import { headers } from "next/headers";

import { appStage } from '@/config';

import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';

import MedicalRecordReminder from '@/components/MedicalRecordReminder';
import CallForAmbulance from '@/components/CallForAmbulance';
import DevTools from '@/components/DevTools';

import {
  OutletStyle,
  OutletStyleType,
  PanelH1,
  PanelH2,
  PanelH3,
  PanelH4,
  PanelV1
} from './style';

const blacklistedRoute = [
  '/patient-portal',
  '/doctor-detail',
  '/book-appointment'
];


export default function Home({
  props,
  children,
}: {
  children: React.ReactNode,
  props: {
    containerStyle?: OutletStyleType;
    footerShow?: boolean;
  };
}) {
  const headersList = headers();
  const pathname = headersList.get("x-invoke-path") || "";
  const shouldRenderReminder = !blacklistedRoute.some(route => pathname.includes(route));

  return (
    <>
      <Header />
      { children }

      { props?.footerShow !== false &&
        <Footer />
      }
      { props?.footerShow !== false &&
        <CallForAmbulance />
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
