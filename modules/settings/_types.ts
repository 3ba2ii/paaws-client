import { EditableProps } from '@chakra-ui/react';
import { FormikProps } from 'formik';

export type UpdateUserDataType = {
  full_name: string;
  bio: string;
  avatar: string | null;
  email: string;
};

export type EditableFieldsType<T> = {
  key: keyof UpdateUserDataType;
  label: string;
  name: string;
  onSubmit: (formikProps: FormikProps<T>) => void;
  onAbort: (formikProps: FormikProps<T>) => void;
  onCancel: (formikProps: FormikProps<T>) => void;
  isLoading?: boolean;
  helperText?: string;
  placeholder?: string;
  textarea?: boolean;
  editableProps?: EditableProps;
};

export const SettingsTabsList: { key: string; title: string; url: string }[] = [
  { key: 'about-you', title: 'About you', url: '/settings' },
  { key: 'security', title: 'Security', url: `/settings/security` },
  { key: 'account', title: 'Account', url: '/settings/account' },
  { key: 'connections', title: 'Connections', url: '/settings/connections' },
  {
    key: 'email-settings',
    title: 'Email Settings',
    url: '/settings/email-settings',
  },
  { key: 'preferences', title: 'Preferences', url: '/settings/preferences' },
  {
    key: 'notifications',
    title: 'Notifications',
    url: '/settings/notifications',
  },
  { key: 'display', title: 'Display', url: '/settings/display' },
  { key: 'danger-area', title: 'Danger Area', url: '/settings/danger-area' },
];
