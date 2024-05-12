import React from 'react'
import { useTranslation } from 'react-i18next';

export default function LoadingPage() {
  const { t } = useTranslation("general");
  return (
    <div className='flex flex-row justify-center items-end mt-4'>
      <img className='w-8 h-8' src="/images/icon/loading.gif" alt="icon-loading" />
      <p className='ml-2'>{t('loading')}</p>
    </div>
  )
}
