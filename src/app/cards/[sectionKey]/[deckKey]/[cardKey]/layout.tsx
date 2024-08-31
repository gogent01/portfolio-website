import { ReactNode } from 'react';
import BodyBackground from '@/components/cards/BodyBackground';

export default async function Layout(props: { children: ReactNode }) {
  const { children } = props;

  return <BodyBackground>{children}</BodyBackground>;
}
