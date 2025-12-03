import { IconSymbol } from '@/components/ui/icon-symbol';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#C94A3A',
        tabBarInactiveTintColor: '#9AA0A6',
        tabBarStyle: {
          position: 'absolute',
          bottom: 6,
          left: 24,
          right: 24,
          borderRadius: 32,
          height: 64,
          backgroundColor: '#fff',
          shadowColor: '#000',
          shadowOpacity: 0.06,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 4 },
          elevation: 6,
          paddingBottom: 0,
          borderTopWidth: 0,
        },
        tabBarLabelPosition: 'below-icon',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 2,
        },
      }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Menu',
            tabBarIcon: ({ color, size }) => (
              <IconSymbol size={24} name="cup.and.saucer.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            title: 'Cart',
            tabBarIcon: ({ color, size }) => (
              <IconSymbol size={24} name="cart.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            title: 'Account',
            tabBarIcon: ({ color, size }) => (
              <IconSymbol size={24} name="person.crop.circle.fill" color={color} />
            ),
          }}
        />
      </Tabs>
    );
  }