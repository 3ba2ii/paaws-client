import { CloseIcon, EditIcon } from '@chakra-ui/icons';
import {
  Button,
  ButtonGroup,
  Editable,
  EditableInput,
  EditableInputProps,
  EditablePreview,
  EditablePreviewProps,
  EditableProps,
  EditableTextarea,
  Flex,
  IconButton,
  useEditableControls,
} from '@chakra-ui/react';
import { FastField, useField } from 'formik';
import React, { InputHTMLAttributes, useEffect, useState } from 'react';

export type CustomEditableFieldProps = InputHTMLAttributes<
  HTMLInputElement | HTMLTextAreaElement
> & {
  name: string;
  label: string;
  defaultValue: string;
  textarea?: boolean;
  isLoading?: boolean;
  hasError?: boolean;
  editableProps?: EditableProps;
  editablePreviewProps?: EditablePreviewProps;
  editableInputProps?: EditableInputProps;
};

const CustomEditableField: React.FC<CustomEditableFieldProps> = ({
  defaultValue,
  editableProps,
  editablePreviewProps,
  isLoading = false,
  hasError = false,
  textarea = false,
  ...props
}) => {
  /* Here's a custom control */
  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return !isEditing && !isLoading && !hasError ? (
      <Flex justifyContent='center'>
        <IconButton
          aria-label='edit'
          size='sm'
          icon={<EditIcon />}
          {...getEditButtonProps()}
        />
      </Flex>
    ) : (
      <ButtonGroup ms={4} justifyContent='center' size='sm'>
        <Button
          aria-label='submit'
          colorScheme='teal'
          variant='outline'
          {...getSubmitButtonProps()}
          isLoading={isLoading}
        >
          Save
        </Button>
        <IconButton
          aria-label='cancel'
          icon={<CloseIcon />}
          variant='outline'
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    );
  }

  const [field, { error }] = useField(props);

  return (
    <Editable
      {...{ defaultValue, ...editableProps }}
      isPreviewFocusable={editableProps?.isPreviewFocusable || hasError}
    >
      <Flex
        w='100%'
        flexDir={'row'}
        justify='space-between'
        style={{ wordBreak: 'break-all' }}
      >
        <EditablePreview {...editablePreviewProps} />
        {/* Here is the custom input */}
        <FastField
          as={textarea ? EditableTextarea : EditableInput}
          {...field}
          {...props}
          id={field.name}
        />
        <EditableControls />
      </Flex>
    </Editable>
  );
};
export default CustomEditableField;
