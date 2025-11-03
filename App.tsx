import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { HeroSection } from './src/components/HeroSection';
import { ProfileCard } from './src/components/ProfileCard';
import { LoginForm } from './src/components/LoginForm';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <HeroSection />
        <ProfileCard />
        <LoginForm />
      </ScrollView>
      
    </SafeAreaView>

  );
};

export default App;
