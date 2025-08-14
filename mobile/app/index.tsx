import { api } from 'backend';
import { usePaginatedQuery } from 'convex/react';
import { Image } from 'expo-image';

import { Screen, Stack, Box, Text, List } from '../ui/primitives';

const Index = () => {
  const { results, isLoading, loadMore } = usePaginatedQuery(
    api.shows.list,
    {},
    { initialNumItems: 10 }
  );

  return (
    <Screen>
      <Box fill background='bg'>
        <Stack fill gap='xl' justify='flex-start' padding='xl'>
          <Stack gap='sm'>
            <Text size='display' weight='bold'>
              Drafted Reality
            </Text>
            <Text color='muted'>Shows</Text>
          </Stack>

          {isLoading && results.length === 0 ? (
            <Text color='muted'>Loading…</Text>
          ) : (
            <List
              data={results}
              gap='md'
              keyExtractor={item => item._id}
              renderItem={item => (
                <Box
                  background='surface'
                  borderColor='border'
                  borderWidth={1}
                  padding='md'
                  radius='md'
                >
                  <Image
                    contentFit='cover'
                    source={{ uri: item.imageUrl }}
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 10,
                      marginBottom: 8,
                    }}
                  />
                  <Text weight='bold'>{item.title}</Text>
                </Box>
              )}
              onEndReached={() => loadMore(10)}
              onEndReachedThreshold={0.5}
            />
          )}
        </Stack>
      </Box>
    </Screen>
  );
};

export default Index;
