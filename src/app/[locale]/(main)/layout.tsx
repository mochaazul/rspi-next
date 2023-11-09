import type { Metadata } from 'next';
import { headers } from "next/headers";
import { Inter } from 'next/font/google';

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

const blacklistedRoute = [
  '/patient-portal',
  '/doctor-detail',
  '/book-appointment'
];

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
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
