
"use client";

import { ReactElement } from 'react'
import { I18nProviderClient } from '../../locales/client'
 
export default function SubLayout({ params: { locale }, children }: { params: { locale: string }, children: ReactElement }) {
  return (
    <html lang={locale}>
      <body cz-shortcut-listen="true">
        <I18nProviderClient locale={locale}>
          {children}
        </I18nProviderClient>
      </body>
    </html>
  )
}