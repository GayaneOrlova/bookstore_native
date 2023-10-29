import React, {  } from 'react';
import { View, Image, Text, } from 'react-native';

import { CommentsType } from '../../../store/slices/bookSlice';
import renderItemCommentsStyle from './RenderItemCommentsStyle';
import PostComment from '../PostComment';

type Props = {
  item:CommentsType;
}

const RenderItemComments: React.FC<Props> = (props) => {
  return (
    <View>
      <View style={renderItemCommentsStyle.comment_item}>
      <View style={renderItemCommentsStyle.detail_info_group}>
        <Image source={{ uri: props.item.avatar_url }} style={renderItemCommentsStyle.avatar_image} />
        <View >
          <Text style={renderItemCommentsStyle.comment_author}>{props.item.author}</Text>
          <Text style={renderItemCommentsStyle.comment_time}>{props.item.created_at}</Text>
        </View>
      </View>
      <Text>{props.item.body}</Text>
    </View>
    </View>
  );
};

export default RenderItemComments;
