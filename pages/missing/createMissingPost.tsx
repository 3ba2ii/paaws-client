import { Layout } from 'components/Layout';
import {
  MissingPostTypes,
  PrivacyType,
  useCreateMissingPostMutation,
} from 'generated/graphql';
import React from 'react';
import withApollo from 'utils/withApollo';

const MissingPage: React.FC = () => {
  const [files, setFiles] = React.useState<FileList | null>(null);
  const [createPost] = useCreateMissingPostMutation();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { data } = await createPost({
      variables: {
        input: {
          title: 'New Post',
          description:
            'Pariatur esse ipsum exercitation ipsum culpa elit amet deserunt velit consequat ea.',
          privacy: PrivacyType.Private,
          type: MissingPostTypes.Missing,
          address: {
            lat: 59.22,
            lng: 15.04,
          },
        },
        images: files,
      },
    });
    console.log(`🚀 ~ file: index.tsx ~ line 18 ~ handleSubmit ~ data`, data);
  };
  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <input
          type='file'
          multiple
          onChange={(e) => setFiles(e.target.files)}
        />
        <button type='submit'>Submit</button>
      </form>
    </Layout>
  );
};
export default withApollo(MissingPage);
