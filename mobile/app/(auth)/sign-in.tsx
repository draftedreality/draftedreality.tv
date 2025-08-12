import * as WebBrowser from 'expo-web-browser';
import { useEffect } from 'react';
import { Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { authClient } from '@/auth-client';
import { ThemedText } from '@/components/ThemedText';

WebBrowser.maybeCompleteAuthSession();

const Page = () => {
  useWarmUpBrowser();

  return (
    <SafeAreaView>
      <Pressable onPress={() => void authClient.signIn.social({ provider: 'google', callbackURL: '/explore' })}>
        <ThemedText type='title'>Sign In</ThemedText>
      </Pressable>
    </SafeAreaView>
  );
};

// eslint-disable-next-line import/no-default-export
export default Page;

const useWarmUpBrowser = () => {
  useEffect(() => {
    // Preloads the browser for Android devices to reduce authentication load time
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};
