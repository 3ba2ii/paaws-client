import { Box } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/react';
import { LoadingComponent } from 'components/common/loading/LoadingSpinner';
import NotFound from 'components/NotFound';
import { Formik, FormikHelpers } from 'formik';
import {
  MissingPostQuery,
  MissingPostTypes,
  PrivacyType,
  useCreateMissingPostMutation,
  useEditMissingPostMutation,
} from 'generated/graphql';
import { useIsAuth } from 'hooks/useIsAuth';
import React, { useRef, useState } from 'react';
import { PostInputType } from 'types';
import { addNewMissingPostToCache } from 'utils/cache/addNewMissingPost';
import { toErrorMap } from 'utils/toErrorMap';
import { CreateMPSchema } from 'utils/yupSchemas/CreateMPSchema';
import { CustomAlertDialog } from '../../../../components/common/overlays/AlertDialog';
import { NotAuthenticatedComponent } from '../../../../components/NotAuthenticatedComponent';
import MPFormContent from './MPFormContent';

const initialValues: PostInputType = {
  title: '',
  description: '',
  type: MissingPostTypes.Missing,
  privacy: PrivacyType.Public,
  address: null,
  thumbnailIdx: 0,
  images: [],
  showContactInfo: true,
};
interface MPFormProps {
  closeDrawer: VoidFunction;
  missingPost?: MissingPostQuery['missingPost']['missingPost'];
  editMode?: boolean;
}

export const MissingPostForm: React.FC<MPFormProps> = ({
  closeDrawer,
  missingPost,
  editMode = false,
}) => {
  const { user, loading } = useIsAuth();

  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const formRef = useRef(null);

  const [createPost] = useCreateMissingPostMutation();
  const [editPost] = useEditMissingPostMutation();
  const isEditModeOn = editMode && !!missingPost;
  const toast = useToast();

  const cancelOnClickOutside = ({
    description,
    images,
    title,
  }: PostInputType) => {
    const hasValue = title.length || description.length || images.length;

    //if the click happened in the location modal, ignore
    if (hasValue) {
      // if any of the values are null, then we show confirmation modal
      return setOpenAlertDialog(true);
    }
    return closeDrawer();
  };
  const handleCreateMP = async (
    { images, ...input }: PostInputType,
    { setErrors, setFieldError }: FormikHelpers<PostInputType>
  ) => {
    if (!images || !images.length) {
      return setFieldError(
        'images',
        'Please provide at least one image for the pet'
      );
    }
    const { data } = await createPost({
      variables: { input, images },
      update: (cache, { data: result, errors }) => {
        if (result && !errors?.length)
          return addNewMissingPostToCache(cache, result);
      },
    });
    if (data?.createMissingPost.errors?.length) {
      setErrors(toErrorMap(data?.createMissingPost.errors));
      toast({
        title: 'Create Post Failed ❌',
        description:
          'An error occurred while trying to create your post, please try again',
        status: 'error',
      });
    } else {
      toast({
        title: 'Post Created Successfully',
        description: `Your post has been created successfully, 
          and we've sent notifications to nearby users to help you in the searching process`,
        status: 'success',
      });
    }
    return closeDrawer();
  };

  const handleEditMP = async ({
    title,
    description,
    privacy,
    type,
    showContactInfo,
  }: Partial<PostInputType>) => {
    if (!missingPost || !missingPost.id) return closeDrawer();
    const { data } = await editPost({
      variables: {
        id: missingPost.id,
        input: { title, description, privacy, type, showContactInfo },
      },
    });
    if (data?.editMissingPost.errors?.length) {
      toast({
        title: 'Edit Post Failed ❌',
        description:
          'An error occurred while trying to edit your post, please try again',
        status: 'error',
      });
    } else {
      toast({
        title: 'Post Edited Successfully',
        description:
          'Your post has been edited, If you did not see any changes, please refresh the page',
        status: 'success',
      });
    }
    return closeDrawer();
  };

  if (editMode && !missingPost) {
    return (
      <NotFound
        subtitle="We couldn't find the post, Please try again later"
        title='😥 404 Not Found'
      />
    );
  }
  return (
    <Box w='100%' h='100%' my={2} ref={formRef}>
      {loading ? (
        <LoadingComponent />
      ) : !user ? (
        <NotAuthenticatedComponent
          title='Not Authenticated'
          subtitle='You must login to be able to create a new post'
        />
      ) : (
        <Formik
          initialValues={
            isEditModeOn
              ? ({
                  ...initialValues,
                  ...missingPost,
                } as PostInputType)
              : initialValues
          }
          validationSchema={CreateMPSchema}
          onSubmit={async (values, helpers) => {
            editMode ? handleEditMP(values) : handleCreateMP(values, helpers);
          }}
        >
          {(formProps) => (
            <Box h='100%' w='100%'>
              <MPFormContent
                {...{
                  formProps,
                  user,
                  cancelOnClickOutside,
                  formRef,
                  missingPost: missingPost,
                  editMode: isEditModeOn,
                }}
              />
            </Box>
          )}
        </Formik>
      )}
      <CustomAlertDialog
        header={'Close Form 👀'}
        body='Are you sure? all the fields you filled will be cleared on closing and cannot be restored again'
        confirmText='Close anyway'
        isOpen={openAlertDialog}
        cancelText='Cancel'
        handleCancel={() => setOpenAlertDialog(false)}
        handleConfirm={() => closeDrawer()}
      />
    </Box>
  );
};
