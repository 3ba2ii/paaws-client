import {
  FormControl,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/form-control';
import { CloseIcon } from '@chakra-ui/icons';
import { Input, InputProps } from '@chakra-ui/input';
import { Box, List, ListItem, Text, VStack } from '@chakra-ui/layout';
import {
  CloseButton,
  IconButton,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
import { useField, useFormikContext } from 'formik';
import React, { useCallback, useMemo } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { FaRegImages } from 'react-icons/fa';
import s from 'styles/custom-dropzone.module.css';
import Image from 'next/image';
import ImageWithFallback from '../media/ImageWithFallback';
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

export const MyDropzone: React.FC<CustomDropzoneProps> = ({
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

const PreviewComponent: React.FC<{
  values: [File];
  thumbnailIdx: number;
  handleThumbnailChange?: (idx: number) => void;
  handleChange: (acceptedFiles: File[], rejectedFiles: FileRejection[]) => void;
}> = ({ values, thumbnailIdx, handleThumbnailChange, handleChange }) => {
  const clearAll = () => {
    handleChange([], []);
  };
  const deleteImage = (idx: number) => {
    const newImages = values.filter((_, index) => index !== idx);
    handleChange(newImages, []);
  };

  return (
    <List
      as='ul'
      className={s.preview_container}
      bg={useColorModeValue('#fafafa', 'gray.700')}
    >
      <Tooltip label='Clear'>
        <CloseButton
          pos='absolute'
          top='50%'
          transform='translateY(-50%)'
          right='10px'
          color='whiteAlpha.500'
          onClick={clearAll}
        />
      </Tooltip>
      {values.map((file: File, idx: number) => {
        const isThumbnail = idx === thumbnailIdx;
        const src = URL.createObjectURL(file) || null;
        return (
          <ListItem
            key={idx}
            className={`${s.preview_item} ${isThumbnail ? s.selected : ''}`}
            onClick={() => {
              handleThumbnailChange && handleThumbnailChange(idx);
            }}
            pos='relative'
          >
            <Tooltip
              hidden={!isThumbnail}
              label='This image will be used as a thumbnail'
              placement='top'
              hasArrow
              defaultIsOpen={isThumbnail}
            >
              {src ? (
                <Box>
                  <Image
                    src={src}
                    width={'100%'}
                    height={'100%'}
                    alt='Preview'
                  />
                </Box>
              ) : null}
            </Tooltip>
            <IconButton
              aria-label='Remove Media'
              pos='absolute'
              top='1px'
              right='1px'
              color='red.400'
              size='xs'
              fontSize={'8px'}
              variant='ghost'
              icon={<CloseIcon />}
              onClick={() => deleteImage(idx)}
              tabIndex={2}
            />
          </ListItem>
        );
      })}
    </List>
  );
};
