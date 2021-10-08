import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Box, Text } from '@chakra-ui/layout';
import { useField, useFormikContext } from 'formik';
import React, { useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaRegImages } from 'react-icons/fa';
import s from 'styles/custom-dropzone.module.css';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  minHeight: '150px',
  justifyContent: 'center',
  borderWidth: 2,
  borderRadius: 6,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  cursor: 'pointer',
  position: 'relative',
};

const activeStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

interface CustomDropzoneProps {
  name: string;
  placeholder?: string;
  label: string;
  required?: boolean;
  helperText?: string;
  showThumbnail?: boolean;
}

export const MyDropzone: React.FC<CustomDropzoneProps> = ({
  label,
  helperText,
  required = true,
  showThumbnail = true,
  ...props
}) => {
  const [field, { error, touched }] = useField(props);
  console.log(`🚀 ~ file: CustomDropzone.tsx ~ line 64 ~ error`, error);
  const form = useFormikContext();

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles && rejectedFiles.length) {
      form.setFieldError(
        field.name,
        'Please upload only 10 images with maximum size of 5MBs pet image'
      );
      return;
    }
    // Do something with the files
    form.setFieldValue(field.name, acceptedFiles.slice(0, 10));
  }, []);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    isDragAccept,
  } = useDropzone({
    onDrop,
    maxFiles: 10,
    maxSize: 1024 * 1024 * 5,
    multiple: true,
    accept: 'image/*',
  });

  const style = useMemo(
    () =>
      ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {}),
      } as React.CSSProperties | undefined),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <FormControl isInvalid={!!error && touched} isRequired={required}>
      <FormLabel fontSize='sm' htmlFor={field.name}>
        {label}
      </FormLabel>

      <div {...getRootProps({ style })} className='dropzone-container'>
        <Input {...(getInputProps() as any)} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <>
            <Box my={2}>
              <FaRegImages size='24px' color='#718096' />
            </Box>
            <Text textStyle='p1' color='gray.500' fontWeight='400'>
              Drag ‘n Drop images here, or click to browse
            </Text>
            <Text textStyle='p3' color='gray.400' fontWeight='400'>
              Files Supported: .png .jpg .webp up to 5MB each
            </Text>
          </>
        )}
        {field.value && field.value.length ? (
          <PreviewComponent
            values={field.value as [File]}
            thumbnailIdx={
              Math.min(
                field.value.length - 1,
                (form?.values as any)?.thumbnailIdx as number
              ) || 0
            }
            handleThumbnailChange={(idx: number) => {
              form.setFieldValue('thumbnailIdx', idx);
            }}
          />
        ) : null}
      </div>

      {helperText ? (
        <FormHelperText maxW='60ch'>
          <Text textStyle='helperText'>{helperText}</Text>
        </FormHelperText>
      ) : null}
      {error ? <FormErrorMessage maxW='45ch'>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

const PreviewComponent: React.FC<{
  values: [File];
  thumbnailIdx: number;
  handleThumbnailChange?: (idx: number) => void;
}> = ({ values, thumbnailIdx, handleThumbnailChange }) => {
  console.log(
    `🚀 ~ file: CustomDropzone.tsx ~ line 145 ~ thumbnailIdx`,
    thumbnailIdx
  );
  return (
    <ul className={s.preview_container}>
      {values.map((file: File, idx: number) => (
        <li
          key={idx}
          className={`${s.preview_item} ${
            thumbnailIdx === idx ? s.selected : ''
          }`}
          onClick={() => {
            handleThumbnailChange && handleThumbnailChange(idx);
          }}
        >
          <img src={URL.createObjectURL(file)} alt='preview' />
        </li>
      ))}
    </ul>
  );
};
