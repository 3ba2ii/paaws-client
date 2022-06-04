import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import OwnedPetsGrid from 'modules/pet/OwnedPetsGrid';
import React from 'react';
import UserMissingPosts from './UserMissingPosts';
import UserVotesMP from './UserVotesMP';

interface UserProfileTabsProps {
  userId: number;
}
const ProfileTabs: { tabName: string }[] = [
  { tabName: 'Adoption Posts' },
  { tabName: 'Missing Posts' },
  { tabName: 'Owned Pets' },
  { tabName: 'Votes' },
];
const UserProfileTabs: React.FC<UserProfileTabsProps> = ({ userId }) => {
  return (
    <Tabs isFitted size='md' variant='line' isLazy>
      <TabList color='gray.500'>
        {ProfileTabs.map(({ tabName }, index) => (
          <Tab
            key={tabName + index}
            fontWeight='semibold'
            _selected={{
              border: 'none',
              borderBottom: '2px solid',
              borderColor: 'blue.500',
              color: 'blue.500',
            }}
            _focus={{ border: 'none' }}
          >
            {tabName}
          </Tab>
        ))}
      </TabList>
      <TabPanels minH='500px' h='100%'>
        <TabPanel>
          <p>Adoptions Posts!</p>
        </TabPanel>
        <TabPanel p='0'>
          <UserMissingPosts userId={userId} />
        </TabPanel>
        <TabPanel p='0'>
          <OwnedPetsGrid userId={userId} />
        </TabPanel>
        <TabPanel p='0'>
          <UserVotesMP userId={userId} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
export default UserProfileTabs;
