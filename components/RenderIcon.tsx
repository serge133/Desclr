import React from 'react';
import {
  Ionicons,
  AntDesign,
  Entypo,
  EvilIcons,
  FontAwesome,
} from '@expo/vector-icons';

export type IconTypes =
  | 'Ionicons'
  | 'AntDesign'
  | 'Entypo'
  | 'EvilIcons'
  | 'FontAwesome';

interface Props {
  type: IconTypes;
  name: string;
  size: number;
  color: string;
}

const RenderIcon: React.FC<Props> = (props) => {
  switch (props.type) {
    case 'Ionicons':
      return (
        <Ionicons name={props.name} color={props.color} size={props.size} />
      );
    case 'AntDesign':
      return (
        <AntDesign name={props.name} color={props.color} size={props.size} />
      );
    case 'Entypo':
      return <Entypo name={props.name} color={props.color} size={props.size} />;
    case 'EvilIcons':
      return (
        <EvilIcons name={props.name} color={props.color} size={props.size} />
      );
    case 'FontAwesome':
      return (
        <FontAwesome name={props.name} color={props.color} size={props.size} />
      );
    default:
      return <></>;
  }
};

export default RenderIcon;
