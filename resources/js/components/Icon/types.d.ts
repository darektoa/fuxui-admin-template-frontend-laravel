import React from 'react';

export type IconProps = React.HTMLAttributes<Element> & {
    path: string;
};

export interface IconComponent extends React.FC<IconProps> {
    FeatherIcon: object;
}
