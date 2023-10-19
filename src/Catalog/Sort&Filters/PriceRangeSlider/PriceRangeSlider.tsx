import React, { Dispatch, SetStateAction, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

import priceRangeSliderStyles from './PriceRangeSliderStyle';

type Props = {
  rangeState: number[];
  rangeStateMin: number;
  rangeStateMax: number;
  setRangeState: Dispatch<SetStateAction<number[]>>;
};

const RangeSlider: React.FC<Props> = (props) => {
  const [showSecondView, setShowSecondView] = useState(false);
  
  const onValuesChange = (value: React.SetStateAction<number[]>) => {
    props.setRangeState(value);
  };

  const handleButtonClick = () => {
    setShowSecondView(!showSecondView);
  };

  return (
      <View style={{ alignItems: 'center' }}>
        <View style={priceRangeSliderStyles.box}>
          <Text style={priceRangeSliderStyles.text}>Price</Text>
          <TouchableOpacity onPress={handleButtonClick} style={priceRangeSliderStyles.dropdown_button}>
            <Image source={require('..//..//..//../images/icons/downt.png')} style={priceRangeSliderStyles.dropdown_button_image} />
          </TouchableOpacity>
        </View>
        {showSecondView && (
          <View style={priceRangeSliderStyles.dropdown}>
            <MultiSlider
              containerStyle={priceRangeSliderStyles.slider_container}
              values={props.rangeState}
              sliderLength={260}
              min={0}
              max={100}
              step={1}
              onValuesChange={onValuesChange}
              trackStyle={priceRangeSliderStyles.track}
              selectedStyle={priceRangeSliderStyles.selectedTrack}
              markerStyle={priceRangeSliderStyles.markers}
            />
            <View style={priceRangeSliderStyles.rangeValues}>
              <Text>${props.rangeStateMin}</Text>
              <Text>${props.rangeStateMax}</Text>
            </View>
          </View>
        )}
      </View>
  );
};

export default RangeSlider;
