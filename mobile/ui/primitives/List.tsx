import { FlatList, View } from 'react-native';

import type { ListProps } from './types';
import { getSpacing } from './utils';

export const List = <ItemT,>({
  data,
  renderItem,
  keyExtractor,
  horizontal,
  gap,
  padding,
  paddingHorizontal,
  paddingVertical,
  onEndReached,
  onEndReachedThreshold,
}: ListProps<ItemT>) => {
  const separatorSize = getSpacing(gap) ?? 0;
  const containerPadding = getSpacing(padding);
  const containerPaddingHorizontal = getSpacing(paddingHorizontal);
  const containerPaddingVertical = getSpacing(paddingVertical);

  return (
    <FlatList
      data={data}
      horizontal={horizontal}
      keyExtractor={keyExtractor}
      renderItem={({ item, index }) => renderItem(item, index)}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        padding: containerPadding,
        paddingHorizontal: containerPaddingHorizontal,
        paddingVertical: containerPaddingVertical,
      }}
      ItemSeparatorComponent={() => (
        <View
          style={
            horizontal === true
              ? { width: separatorSize }
              : { height: separatorSize }
          }
        />
      )}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
    />
  );
};
