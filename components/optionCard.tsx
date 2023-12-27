import React, {useState} from 'react';
import axios from 'axios';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export type OptionData = {
  id: number;
  price: number;
  weight: number;
  city_production: string;
  category: string;
  image_path: string;
  manufacturing_ccompany: string;
  component_name: string;
  description: string;
  engine_name: string;
  total_thrust: number;
  dry_weight: number;
  combustion_chamber_pressure: number;
}

interface ObjectCardProps {
  option: OptionData;
  onDetailsPress: () => void; 
}

const ObjectCard: React.FC<ObjectCardProps> = ({ option }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={{ uri: option?.image_path}} style={styles.image_path} />
        <View style={styles.details}>
          <Text style={styles.component_name}>{option?.component_name}</Text>
          <Text style={styles.category}>{option?.category}</Text>

          {/* <Text style={styles.price}>{object.price}</Text> */}

  
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#01086f',
    color: '#fff',
    borderRadius: 8,
    padding: 40,
    marginVertical: 8,
    elevation: 2,
    width: '90%',
  },
  image_path: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  component_name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
  },
  category: {
    fontSize: 16,
    color: '#fff',
  },
  price: {
    fontSize: 14,
    color: '#fff',
  },
  detailsButton: {
    backgroundColor: '#000',
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ObjectCard;