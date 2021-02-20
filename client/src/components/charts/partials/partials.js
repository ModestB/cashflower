import React from 'react';
import { ucFirst } from '../../../shared/utilities';

export default function renderColorfulLegendText(value, entry) {
  const { color } = entry;
  return <span style={{ color }}>{ucFirst(value)}</span>;
}
