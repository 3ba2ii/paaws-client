import { Box, Text, Heading, VStack } from '@chakra-ui/react';
import CustomDropzone from 'components/common/input/CustomDropzone';
import { FormikProps } from 'formik';
import React from 'react';
import { CreatePetInputType } from 'types';

interface UploadPetImagesStepProps {
  formik: FormikProps<CreatePetInputType>;
}

const UploadPetImagesStep: React.FC<UploadPetImagesStepProps> = ({}) => {
  return (
    <VStack w='100%' h='100%' align={'flex-start'} p='32px' spacing={'24px'}>
      <Box>
        <Heading fontSize={'24px'} size='lg' color='gray.700'>
          Upload your Pet’s Images
        </Heading>
        <Text textStyle='p1'>Show us the beauty of your pet ✨</Text>
      </Box>
      <CustomDropzone label='Pet Images' name='images' required />
    </VStack>
  );
};
export default UploadPetImagesStep;
