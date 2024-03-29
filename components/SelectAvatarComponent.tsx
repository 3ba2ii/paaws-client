import { Box, Input } from '@chakra-ui/react';
import { MeQuery } from 'generated/graphql';
import React from 'react';
import UserAvatar from './common/UserAvatar';

interface SelectAvatarComponentProps {
  user: MeQuery['me'];
  onChange: (avatarFile: File) => void;
  avatarURL?: string | null;
}

const SelectAvatarComponent: React.FC<SelectAvatarComponentProps> = ({
  user,
  avatarURL,
  onChange,
}) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  if (!user) return null;
  return (
    <Box>
      <UserAvatar
        avatarURL={avatarURL}
        name={user.displayName}
        avatarProps={{
          size: '2xl',
          p: '90px',
          pos: 'relative',
          cursor: 'pointer',
          overflow: 'hidden',
          onClick: () => {
            if (inputRef && inputRef.current) inputRef.current.click();
          },
          backgroundImage: avatarURL ? avatarURL : '',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',

          _before: {
            content: '"Edit Avatar"',
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            height: '50px',
            backgroundColor: 'whiteAlpha.300',
            fontSize: '1rem',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '0.6rem',
            fontWeight: 'semibold',
            textTransform: 'initial',
            color: 'whiteAlpha.700',
          },
        }}
      />
      <Input
        id='avatar-input-field'
        type='file'
        ref={inputRef}
        display='none'
        accept='image/*'
        onChange={(e: any) => {
          try {
            e && onChange(e.target.files?.[0]);
          } catch {}
        }}
      />
    </Box>
  );
};
export default SelectAvatarComponent;
