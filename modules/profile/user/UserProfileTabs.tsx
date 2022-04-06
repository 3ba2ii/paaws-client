import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import OwnedPetsGrid from 'modules/pet/OwnedPetsGrid';
import React from 'react';

interface UserProfileTabsProps {
  userId: number;
}
const ProfileTabs: { tabName: string }[] = [
  { tabName: 'Adoption Posts' },
  { tabName: 'Missing Posts' },
  { tabName: 'Owned Pets' },
  { tabName: 'My Favorites' },
  { tabName: 'Votes' },
];
const UserProfileTabs: React.FC<UserProfileTabsProps> = ({ userId }) => {
  return (
    <Tabs isFitted size='md' variant='line'>
      <TabList color='gray.500'>
        {ProfileTabs.map(({ tabName }, index) => (
          <Tab
            key={tabName + index}
            _selected={{
              fontWeight: 'semibold',
              borderBottom: '2px solid',
              borderColor: 'blue.600',
              color: 'blue.600',
            }}
          >
            {tabName}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        <TabPanel>
          <p>Adoptions Posts!</p>
        </TabPanel>
        <TabPanel>
          <p>Missing Posts!</p>
        </TabPanel>
        <TabPanel>
          <OwnedPetsGrid userId={userId} />
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
