'use client';

// I had to create this component since the Provider component uses react hooks and causes to break
// the layout page that should be a servercomponent but with the Provider it only worked being a client component.

import { Provider } from 'react-redux';
import { store } from '@/redux/store';

export default function ReduxProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
