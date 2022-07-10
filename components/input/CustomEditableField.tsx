import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import {
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
import React, { InputHTMLAttributes } from 'react';

export type CustomEditableFieldProps = InputHTMLAttributes<
  HTMLInputElement | HTMLTextAreaElement
> & {
  name: string;
  label: string;
  defaultValue: string;
  textarea?: boolean;
  editableProps?: EditableProps;
  editablePreviewProps?: EditablePreviewProps;
  editableInputProps?: EditableInputProps;
};

const CustomEditableField: React.FC<CustomEditableFieldProps> = ({
  label,
  defaultValue,
  editableProps,
  editableInputProps,
  editablePreviewProps,
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

    return isEditing ? (
      <ButtonGroup ms={4} justifyContent='center' size='sm'>
        <IconButton
          aria-label='submit'
          icon={<CheckIcon />}
          {...getSubmitButtonProps()}
        />
        <IconButton
          aria-label='cancel'
          icon={<CloseIcon />}
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    ) : (
      <Flex justifyContent='center'>
        <IconButton
          aria-label='edit'
          size='sm'
          icon={<EditIcon />}
          {...getEditButtonProps()}
        />
      </Flex>
    );
  }

  const [field] = useField(props);

  return (
    <Editable {...{ defaultValue, ...editableProps }}>
      <Flex w='100%' flexDir={'row'} justify='space-between'>
        <EditablePreview {...editablePreviewProps} />
        {/* Here is the custom input */}
        <FastField
          as={textarea ? EditableTextarea : EditableInput}
          {...field}
          {...props}
          id={field.name}
          opacity='.8'
        />
        <EditableControls />
      </Flex>
    </Editable>
  );
};
export default CustomEditableField;
