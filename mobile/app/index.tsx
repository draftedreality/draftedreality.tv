import { Stack, Row, Box, Text } from '../ui/primitives';

const Index = () => {
  return (
    <Box fill background='bg'>
      <Stack fill align='center' gap='xl' justify='center' padding='xl'>
        <Text size='display' weight='bold'>
          Drafted Reality
        </Text>
        <Text color='muted'>Minimal design system primitives</Text>
        <Row gap='md'>
          <Box background='surface' borderColor='border' borderWidth={1} padding='md' radius='md'>
            <Text>Surface</Text>
          </Box>
          <Box background='primary' padding='md' radius='md'>
            <Text color='primaryText'>Primary</Text>
          </Box>
        </Row>
      </Stack>
    </Box>
  );
};

export default Index;
