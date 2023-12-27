import React, {useState, } from 'react';
import { View, Text, Button, Pressable, StyleSheet,Image, ScrollView } from 'react-native';
import axios from 'axios';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { OptionData } from './optionCard';
import NavigationBar from './navbar';

type OptionDetailsRouteProp = RouteProp<{
  optionDetailsScreen: { option: OptionData };
}, 'optionDetailsScreen'>;

const ObjectDetailsScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<OptionDetailsRouteProp>();
  const [currentOption, setOption] = useState<OptionData>()
  const { option } = route.params;
  const getOption = async () => {
    try {
        const response = await axios(`http://172.20.10.2:8000/options/${option.id}`, {
            method: 'GET',
        });
        setOption({
          id: response.data.id,
          price: response.data.price,
          weight: response.data.weight,
          city_production: response.data.city_production,
          category: response.data.category,
          image_path: response.data.image_path,
          manufacturing_ccompany: response.data.manufacturing_ccompany,
          component_name: response.data.component_name,
          description: response.data.description,
          engine_name: response.data.engine_name,
          total_thrust: response.data.total_thrust,
          dry_weight: response.data.dry_weight,
          combustion_chamber_pressure: response.data.combustion_chamber_pressure,
        }
      )
    }
    catch(e){
      throw e
    }
  };

  React.useEffect(() => {
    getOption()
  }, [])

  return (
    <View style={styles.container}>
      <NavigationBar />
      <ScrollView>
      <View style={styles.content}>
        <Image source={{ uri: option?.image_path }} style={styles.image} />
        <Text style={styles.title}>Название компонента: {option?.component_name}</Text>
        <Text style={styles.info}>Категория: {option?.category}</Text>
        <Text style={styles.info}>Описание: {option?.description}</Text>
        <Text style={styles.info}>Город-производитель: {option?.city_production}</Text>
        <Text style={styles.info}>Компания-производитель: {option?.manufacturing_ccompany}</Text>
        <Text style={styles.info}>Цена: {option?.price} ₽</Text>
        <Text style={styles.info}>Вес: {option?.weight} кг</Text>
        {option?.engine_name !== null && <Text style={styles.info}>Название двигателя: {option?.engine_name}</Text>}
        {option?.total_thrust !== null && <Text style={styles.info}>Общая тяга: {option?.total_thrust} тс</Text>}
        {option?.dry_weight !== null && <Text style={styles.info}>Сухая масса: {option?.dry_weight} кг</Text>}
        {option?.combustion_chamber_pressure && <Text style={styles.info}>Давление в камере сгорания: {option?.combustion_chamber_pressure} кгс/см²</Text>}
      </View>
      <Pressable 
        style={({ pressed }) => ({
          backgroundColor: pressed ? 'white' : '#01086f',
          ...styles.button
        })} 
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.text}>Назад</Text>
      </Pressable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%', // Пример задания ширины изображения
    aspectRatio: 1,
    borderRadius: 10,
    marginBottom: 10, // Добавляем отступ снизу для текста
  },
  content: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 18,
    marginBottom: 5,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#01086f',
    marginTop: 10,
    marginBottom: 40,
    borderColor: '#01086f',
   },
   text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
   },
});

export default ObjectDetailsScreen;