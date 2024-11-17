import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import stonfiLogo from '../../assets/stonfi.png';
import dedustLogo from '../../assets/dedust.png';

type DexIconProps = {
  dex: string;
  altText: string;
  sizePx: number;
};

const pickIcon = (dex: string) => {
  switch (dex) {
    case 'StonfiV1':
    case 'StonfiV2':
      return stonfiLogo;
    case 'DeDust':
      return dedustLogo;
    default:
      return '';
  }
};

const DexIcon: React.FC<DexIconProps> = ({ dex, altText, sizePx = 24 }) => {
  const icon = pickIcon(dex);
  return (
    <Tooltip title={dex}>
      <img
        src={icon}
        alt={altText}
        style={{ width: `${sizePx}px`, height: `${sizePx}px` }}
      />
    </Tooltip>
  );
};

export default DexIcon;
