import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import RenderBookItemStyles from './FavoriteIconStyles';

type Props = {};

const FavoriteIcon: React.FC<Props> = () => {
  const [liked, setLiked] = useState(false);

  const onLikeClick = () => {
    setLiked(!liked);
  };

  return (
      <TouchableOpacity
        style={[RenderBookItemStyles.favorite_button, liked && RenderBookItemStyles.favorite_button_liked]}
        onPress={onLikeClick}
      >
        <FontAwesomeIcon icon={faHeart} color={'#ffffff'} />
      </TouchableOpacity>
  );
};

export default FavoriteIcon;
