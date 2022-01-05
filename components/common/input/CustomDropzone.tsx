import {
  FormControl,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/form-control';
import { Input, InputProps } from '@chakra-ui/input';
import { Box, Text, VStack } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/react';
import { useField, useFormikContext } from 'formik';
import React, { useCallback, useMemo } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { FaRegImages } from 'react-icons/fa';
import PreviewComponent from './PreviewComponent';

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
  borderColor: '#38B2AC',
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

const MyDropzone: React.FC<CustomDropzoneProps> = ({
  label,
  helperText,
  required = true,
  showThumbnail = true,
  ...props
}) => {
  const [field, { error, touched }] = useField(props);

  const form = useFormikContext();

  const onDrop = useCallback(
    (accFiles: File[], rejectedFiles: FileRejection[]) => {
      if (rejectedFiles && rejectedFiles.length) {
        return form.setFieldError(
          field.name,
          'Please upload only 10 images with maximum size of 2MBs pet image'
        );
      }
      // Do something with the files
      form.setFieldValue(field.name, accFiles.slice(0, 10));
    },
    [field.name, form]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    isDragAccept,
  } = useDropzone({
    onDrop,
    maxFiles: 10,
    maxSize: 1024 * 1024 * 2,
    multiple: true,
    accept: '.jpeg , .jpg , .png',
  });

  const handleThumbnailChange = (idx: number) => {
    form.setFieldValue('thumbnailIdx', idx);
  };

  const backgroundStyles = useColorModeValue(
    { backgroundColor: '#fafafa', borderColor: '#eeeeee' },
    { backgroundColor: 'gray.700', borderColor: 'gray.200' }
  );

  const style = useMemo(
    () =>
      ({
        ...{
          ...baseStyle,
          ...backgroundStyles,
        },
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {}),
      } as React.CSSProperties | undefined),
    [isDragActive, isDragReject, isDragAccept, backgroundStyles]
  );

  return (
    <FormControl isInvalid={!!error && touched} isRequired={required}>
      <FormLabel fontSize='sm' htmlFor={field.name}>
        {label}
      </FormLabel>

      <Box
        {...getRootProps({ style })}
        borderColor={error ? 'red.400' : 'gray.600'}
      >
        <Input
          {...(getInputProps() as InputProps)}
          disabled={field.value && field.value.length}
        />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <VStack color='gray.500' spacing={0}>
            <Box my={2}>
              <FaRegImages size='24px' />
            </Box>
            <Text textStyle='p1' color='inherit'>
              Drag ‘n Drop images here, or click to browse
            </Text>
            <Text textStyle='p3' color='inherit'>
              Files Supported: .png .jpg .webp .gif up to 2MB each
            </Text>
          </VStack>
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
            handleThumbnailChange={handleThumbnailChange}
            handleChange={onDrop}
          />
        ) : null}
      </Box>

      {helperText ? (
        <FormHelperText maxW='60ch'>
          <Text textStyle='helperText'>{helperText}</Text>
        </FormHelperText>
      ) : null}
      {error ? (
        <Text
          textStyle={'p2'}
          colorScheme={'red'}
          color='red.400'
          mt={2}
          fontWeight={'normal'}
        >
          {error}
        </Text>
      ) : null}
    </FormControl>
  );
};

export default React.memo(MyDropzone);
