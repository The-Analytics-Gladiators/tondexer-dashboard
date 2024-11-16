import { useState } from 'react';
import { VolumeHistory } from '../../api/types';

const ArbitragePage = () => {
  const [volumeHistory, setVolumeHistory] = useState<VolumeHistory[]>([]);
  const [isVolumeHistoryLoading, setIsVolumeHistoryLoading] =
    useState<boolean>(true);

  return <h1>Coming soon 🤝</h1>;
};

export default ArbitragePage;
