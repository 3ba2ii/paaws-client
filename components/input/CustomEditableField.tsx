import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
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
        <Button
          aria-label='submit'
          colorScheme='teal'
          variant='outline'
          {...getSubmitButtonProps()}
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
