import { FlatList, StyleSheet } from 'react-native';

import { usePaginatedQuery } from 'convex/react';
import { api } from 'backend/_generated/api';
import type { FunctionComponent } from 'react';
import type { Doc } from 'backend/_generated/dataModel';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';

const PAGE_SIZE = 6;

export default function HomeScreen() {
  const { results, status, loadMore } = usePaginatedQuery(
    api.shows.list,
    {},
    { initialNumItems: PAGE_SIZE }
  );

  return (
    <SafeAreaView>
      <FlatList
        keyExtractor={item => item._id}
        data={results}
        numColumns={2}
        contentContainerStyle={styles.container}
        ListHeaderComponent={<ThemedText type='title'>Shows</ThemedText>}
        ListFooterComponent={
          status === 'Exhausted' ? (
            <ThemedText style={{ alignSelf: 'center', paddingBottom: 80 }}>
              Not seeing your favorite show? Tell us!
            </ThemedText>
          ) : null
        }
        columnWrapperStyle={styles.column}
        renderItem={({ item: show }) => <Show show={show} />}
        onEndReached={() => {
          if (status === 'CanLoadMore') {
            loadMore(PAGE_SIZE);
          }
        }}
      />
    </SafeAreaView>
  );
}

const Show: FunctionComponent<{ show: Doc<'shows'> }> = ({ show }) => {
  return (
    <ThemedView style={styles.showContainer}>
      <Image
        source={show.imageUrl}
        contentFit='contain'
        style={{ flex: 1, width: '100%' }}
      />
      <ThemedText
        type='subtitle'
        style={styles.showTitle}
        numberOfLines={1}
        ellipsizeMode='tail'
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
