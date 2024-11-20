import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import stonfiLogo from '../../assets/stonfi.png';
import dedustLogo from '../../assets/dedust.png';

type DexIconProps = {
  dex: string;
  altText: string;
  sizePx: number;
  url?: string;
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

const DexIcon: React.FC<DexIconProps> = ({ dex, altText, sizePx = 24, url }) => {
  const icon = pickIcon(dex);

  const imgElem = <img
        src={icon}
        alt={altText}
        style={{ width: `${sizePx}px`, height: `${sizePx}px` }}
      />

  const img: JSX.Element = (url) ? <a href={url} target="_blank">{imgElem}</a> : imgElem

  return (
    <Tooltip title={dex}>
      {img} 
    </Tooltip>
  );
};

export default DexIcon;
