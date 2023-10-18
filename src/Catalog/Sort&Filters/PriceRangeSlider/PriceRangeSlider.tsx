import React, { Dispatch, SetStateAction, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import PriceRangeSliderStyles from './PriceRangeSliderStyle';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

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
        <View style={PriceRangeSliderStyles.box}>
          <Text style={PriceRangeSliderStyles.text}>Price</Text>
          <TouchableOpacity onPress={handleButtonClick} style={PriceRangeSliderStyles.dropdown_button}>
            <Image source={require('..//..//..//../images/icons/downt.png')} style={PriceRangeSliderStyles.dropdown_button_image} />
          </TouchableOpacity>
        </View>
        {showSecondView && (
          <View style={PriceRangeSliderStyles.dropdown}>
            <MultiSlider
              containerStyle={PriceRangeSliderStyles.slider_container}
              values={props.rangeState}
              sliderLength={260}
              min={0}
              max={100}
              step={1}
              onValuesChange={onValuesChange}
              trackStyle={PriceRangeSliderStyles.track}
              selectedStyle={PriceRangeSliderStyles.selectedTrack}
              markerStyle={PriceRangeSliderStyles.markers}
            />
            <View style={PriceRangeSliderStyles.rangeValues}>
              <Text>${props.rangeStateMin}</Text>
              <Text>${props.rangeStateMax}</Text>
            </View>
          </View>
        )}
      </View>
  );
};

export default RangeSlider;
