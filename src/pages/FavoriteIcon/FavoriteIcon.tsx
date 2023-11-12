import React from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import favoriteIconStyles from './FavoriteIconStyles';
import { COLORS } from '../../utils/colors';

type Props = {
  id: number;
  like: boolean;
  onFavoritePress: () => void;
}

const FavoriteIcon: React.FC<Props> = (props) => {
  return (
      <TouchableOpacity
        style={[favoriteIconStyles.favorite_button, props.like && favoriteIconStyles.favorite_button_liked]}
        onPress={props.onFavoritePress}
      >
        <FontAwesomeIcon icon={faHeart} color={COLORS.white} />
      </TouchableOpacity>
  );
};

export default FavoriteIcon;
