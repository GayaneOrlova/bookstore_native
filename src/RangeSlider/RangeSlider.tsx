import React, { Dispatch, SetStateAction, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import RangeSliderStyles from './RangeSliderStyle';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Slider from 'react-native-slider';


type Props = {
  rangeState: number[];
  rangeStateMin: number;
  rangeStateMax: number;
  setRangeState: Dispatch<SetStateAction<number[]>>;
  handleGenreSelection: () => void;
};

const RangeSlider: React.FC<Props> = (props) => {
  const onValuesChange = (value: React.SetStateAction<number[]>) => {
    props.setRangeState(value);
    props.handleGenreSelection()
  };

  const [showSecondView, setShowSecondView] = useState(false);


  const handleButtonClick = () => {
    setShowSecondView(!showSecondView);
  };

  return (
    <View>
    
    <View style={{ alignItems: 'center' }}>
    <View style={RangeSliderStyles.box}>
    <Text style={RangeSliderStyles.text}>Price</Text>
        <TouchableOpacity onPress={handleButtonClick} style={RangeSliderStyles.dropdown_button}>
          <Image source={require('..//../images/icons/selectButton.png')} style={RangeSliderStyles.dropdown_button_image} />
        </TouchableOpacity>
      </View>
      {showSecondView && (
        <View style={RangeSliderStyles.dropdown}>
          <MultiSlider
      containerStyle={RangeSliderStyles.slider_container}
        values={props.rangeState}
        sliderLength={260}
        min={0}
        max={100}
        step={1}
        onValuesChange={onValuesChange}
        trackStyle={RangeSliderStyles.track}
        selectedStyle={RangeSliderStyles.selectedTrack}
        markerStyle={RangeSliderStyles.markers}
      />
      <View style={RangeSliderStyles.rangeValues}>
        <Text>${props.rangeStateMax}</Text>
        <Text>${props.rangeStateMax}</Text>
      </View>
        
        
        </View>
      )}
    </View>

    
    
    
    
    
      
    </View>
  );
};

export default RangeSlider;
