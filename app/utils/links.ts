import type { NavigationMenuItem } from '@nuxt/ui'

export const navLinks: NavigationMenuItem[] = [
  {
    label: 'Home',
    translations: { ar: 'الرئيسية', tr: 'Ana Sayfa' },
    icon: 'i-lucide-home',
    to: '/'
  },
  {
    label: 'Status',
    translations: { ar: 'الحالة', tr: 'Durum' },
    // icon: 'i-lucide-folder',
    to: '/status'
  },
  // {
  //   label: 'Stages',
  //   translations: { ar: 'المراحل', tr: 'Aşamalar' },
  //   // icon: 'i-lucide-file-text',
  //   to: '/stages'
  // },
  {
    label: 'Donations',
    translations: { ar: 'التبرعات', tr: 'Bağışlar' },
    // icon: 'i-lucide-mic',
    to: '/donations'
  },
  {
    label: 'About',
    translations: { ar: 'عن المشروع', tr: 'Hakkında' },
    // icon: 'i-lucide-user',
    to: '/about'
  }
]
