import React, { useEffect, useState } from 'react';
import { View, FlatList, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';
import OptionCard, {OptionData} from './optionCard';
import NavigationBar from './navbar';
import {  TouchableOpacity, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

//!!!!!!!
export type ReceivedOptionsData = {
  id: number;
  price: number;
  weight: number;
  city_production: string;
  category: string;
  image_path: string;
  manufacturing_ccompany: string;
  component_name: string;
  description: string;
  engine_name: string | null;
  total_thrust: number | null;
  dry_weight: number | null;
  combustion_chamber_pressure: number | null;
}

type RootStackParamList = {
    MainScreen: undefined;
    OptionDetailsScreen: { option: OptionData };
  };
  
  type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MainScreen'>;
  
  interface MainScreenProps {
    navigation: MainScreenNavigationProp;
  }
  
  const MainScreen: React.FC<MainScreenProps> = ({ navigation }) => {
    const [options, setOptions] = useState<OptionData[]>([]);
    const [filteredOptions, setFilteredOptions] = useState<OptionData[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
  //!!!!!!!
    const getOptions = async () => {
      try {
          const response = await axios('http://172.20.10.2:8000/options', {
              method: 'GET',
          });
          const options = response.data;//!!!!!!!
          const newArr = options.map((raw: ReceivedOptionsData) => ({
            id: raw.id,
            price: raw.price,
            weight: raw.weight,
            city_production: raw.city_production,
            category: raw.category,
            image_path: raw.image_path.replace("localhost", "172.20.10.2"),
            manufacturing_ccompany: raw.manufacturing_ccompany,
            component_name: raw.component_name,
            description: raw.description,
            engine_name: raw.engine_name,
            total_thrust: raw.total_thrust,
            dry_weight: raw.dry_weight,
            combustion_chamber_pressure: raw.combustion_chamber_pressure,
          }));
          setOptions(newArr)
          setTimeout(getOptions, 1000); // вызов getOptions каждые 1 секунду
      }
      catch(e){
        throw e
      }
     };

    useEffect(() => {
      getOptions();
    }, []);
    //!!!!!!!
    useEffect(() => {
      if (searchQuery === '') {
        setFilteredOptions(options);
      } else {
        const filtered = options.filter(
          (option) => option.component_name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredOptions(filtered);
      }
      console.log('component_name', searchQuery)
      console.log('')
    }, [searchQuery, options]);
  
    const handleDetailsPress = (option: OptionData) => {
      console.log('Details Pressed:', option.component_name);
      navigation.navigate('OptionDetailsScreen', { option });
    };
  
    const renderOptionCard = ({ item }: { item: OptionData }) => {
      return (
        <TouchableOpacity onPress={() => handleDetailsPress(item)}>
          <OptionCard option={item} onDetailsPress={() => {}} />
        </TouchableOpacity>
      );
    };
  
    return (
      <View style={styles.container}>
        <NavigationBar />
        <TextInput
          style={styles.input}
          placeholder="Поиск по названию*"
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
        />
        <FlatList
          data={filteredOptions}
          renderItem={renderOptionCard}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 0,
    },
    input: {
      height: 40,
      borderWidth: 1,
      borderColor: '#01086f',
      borderRadius: 8,
      paddingHorizontal: 10,
      marginBottom: 10,
      marginTop: 10,
    },
  });
  
  export default MainScreen;