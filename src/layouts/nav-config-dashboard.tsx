import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} />;

export type NavItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
  info?: React.ReactNode;
};

export const navData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Dua Collection',
    path: '/dua-collection',
    icon: icon('ic-user'),
  },
  {
    title: 'Pre Umrah',
    path: '/pre-umrah',
    icon: icon('ic-cart'),
  },
  {
    title: 'Hajj Guide',
    path: '/hajj-guide',
    icon: icon('ic-blog'),
  },
  {
    title: 'Umrah Checklist',
    path: '/umrah-checklist',
    icon: icon('ic-blog'),
  },
  {
    title: 'Safety Guide',
    path: '/safety-guide',
    icon: icon('ic-blog'),
  },
  {
    title: 'Sign in',
    path: '/sign-in',
    icon: icon('ic-lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic-disabled'),
  },
];
