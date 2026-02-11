import React from 'react';

export interface LazyImageProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  placeholder?: React.ReactNode;
}

declare const LazyImage: React.FC<LazyImageProps>;

export default LazyImage;
