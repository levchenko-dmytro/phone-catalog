import './AvailableColors.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { getLink } from '../../services/getLink';
import { productColors } from '../../api/productColors';

type Props = {
  colorsAvailable: string[];
  currentColor: string;
  linkPart: string;
  capacity: string;
};

export const AvailableColors: React.FC<Props> = ({
  colorsAvailable,
  currentColor,
  linkPart,
  capacity,
}) => {
  return (
    <ul
      style={{
        display: 'flex',
        columnGap: '8px',
      }}
    >
      {colorsAvailable.map(color => {
        let backColor = color;

        if (color.includes(' ')) {
          backColor = backColor.replace(' ', '-');
        }

        return (
          <li key={color}>
            <Link
              className="AvailableColors__link-color"
              to={`../${getLink(linkPart, capacity, backColor)}`}
              style={{
                borderColor: `${currentColor === color ? '#313237' : ''}`,
              }}
            >
              <div
                className="AvailableColors__link-color--content"
                style={{
                  backgroundColor: `${productColors[backColor]}`,
                }}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
