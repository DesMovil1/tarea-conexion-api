import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { Gifts } from './Tabs/Gifts';
import { Busqueda } from './Tabs/Busqueda';
import { BusquedaProvider } from './Tabs/BusquedaContext'; 
const Tab = createBottomTabNavigator();

export const Tabs = () => {
    return (
        <BusquedaProvider>
            <Tab.Navigator screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let nombreIcono;
                    switch (route.name) {
                        case 'Busqueda':
                            nombreIcono = focused ? "search" : "search-outline";
                            break;
                        case 'Gifts':
                            nombreIcono = focused ? "image" : "image-outline";
                            break;
                        default:
                            nombreIcono = "ellipse-outline";
                            break;
                    }
                    return <Icon name={nombreIcono} size={size} color={color} />;
                },
                headerTitleAlign: 'center'
            })}>
                <Tab.Screen name="Busqueda" component={Busqueda} />
                <Tab.Screen name="Gifts" component={Gifts} />
            </Tab.Navigator>
        </BusquedaProvider>
    );  
}
