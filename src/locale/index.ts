import { useIntl } from 'react-intl'

import en from './en.json'
import es from './es.json'
import fr from './fr.json'
import pt from './pt.json'

export const locales = [
  { locale: 'en', messages: en, prefix: 'en' },
  { locale: 'es', messages: es, prefix: 'es' },
  { locale: 'pt', messages: pt, prefix: 'pt' },
  { locale: 'fr', messages: fr, prefix: 'fr' },
]

export function useTranslate(): (id: string) => string {
  const { formatMessage } = useIntl()

  return (id: string) => (id ? formatMessage({ id }) : '')
}

export function getDefaultLocale(): string {
  return locales[0].locale
}
