import { api } from 'backend/_generated/api';
import type { Doc } from 'backend/_generated/dataModel';
import { usePaginatedQuery } from 'convex/react';
import { Image } from 'expo-image';
import type { FunctionComponent } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const PAGE_SIZE = 6;

export const HomeScreen = () => {
  const { results, status, loadMore } = usePaginatedQuery(
    api.shows.list,
    {},
    { initialNumItems: PAGE_SIZE }
  );

  return (
    <SafeAreaView>
      <FlatList
        columnWrapperStyle={styles.column}
        contentContainerStyle={styles.container}
        data={results}
        keyExtractor={item => item._id}
        ListHeaderComponent={<ThemedText type='title'>Shows</ThemedText>}
        numColumns={2}
        renderItem={({ item: show }) => <Show show={show} />}
        ListFooterComponent={
          status === 'Exhausted' ? (
            <ThemedText style={{ alignSelf: 'center', paddingBottom: 80 }}>
              Not seeing your favorite show? Tell us!
            </ThemedText>
          ) : null
        }
        onEndReached={() => {
          if (status === 'CanLoadMore') {
            loadMore(PAGE_SIZE);
          }
        }}
      />
    </SafeAreaView>
  );
};

const Show: FunctionComponent<{ show: Doc<'shows'> }> = ({ show }) => {
  return (
    <ThemedView style={styles.showContainer}>
      <Image
        contentFit='contain'
        source={show.imageUrl}
        style={{ flex: 1, width: '100%' }}
      />
      <ThemedText
        ellipsizeMode='tail'
        numberOfLines={1}
        style={styles.showTitle}
        type='subtitle'
      >
        {show.title}
      </ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  column: {
    justifyContent: 'space-around',
  },
  showContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 280,
    width: '45%',
  },
  showTitle: {
    alignSelf: 'center',
    paddingVertical: 8,
  },
});
