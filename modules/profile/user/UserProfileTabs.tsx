import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import React from 'react';

interface UserProfileTabsProps {
  userId: number;
}

const UserProfileTabs: React.FC<UserProfileTabsProps> = ({ userId }) => {
  return (
    <Tabs isFitted size='md' variant='line'>
      <TabList color='gray.500'>
        <Tab
          _selected={{
            fontWeight: 'semibold',
            borderBottom: '2px solid',
            borderColor: 'blue.600',
            color: 'blue.600',
          }}
        >
          Adoption Posts
        </Tab>
        <Tab
          _selected={{
            fontWeight: 'semibold',
            borderBottom: '2px solid',
            borderColor: 'blue.600',
            color: 'blue.600',
          }}
        >
          Missing Posts
        </Tab>
        <Tab
          _selected={{
            fontWeight: 'semibold',
            borderBottom: '2px solid',
            borderColor: 'blue.600',
            color: 'blue.600',
          }}
        >
          Owned Pets
        </Tab>
        <Tab
          _selected={{
            fontWeight: 'semibold',
            borderBottom: '2px solid',
            borderColor: 'blue.600',
            color: 'blue.600',
          }}
        >
          My Favorites
        </Tab>
        <Tab
          _selected={{
            fontWeight: 'semibold',
            borderBottom: '2px solid',
            borderColor: 'blue.600',
            color: 'blue.600',
          }}
        >
          Votes
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <p>Adoptions Posts!</p>
        </TabPanel>
        <TabPanel>
          <p>Missing Posts!</p>
        </TabPanel>
        <TabPanel>
          <p>Owned Pets!</p>
        </TabPanel>
        <TabPanel>
          <p>Favorites</p>
        </TabPanel>
        <TabPanel>
          <p>Votes</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
export default UserProfileTabs;
