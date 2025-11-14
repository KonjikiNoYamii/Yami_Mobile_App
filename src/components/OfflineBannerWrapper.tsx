import React from 'react';

import OfflineBanner from './OfflineBanner';
import { useConnection } from '../context/ConnectionContext';

export default function OfflineBannerWrapper() {
  const { showOfflineBanner } = useConnection();

  if (!showOfflineBanner) return null;
  return <OfflineBanner />;
}
