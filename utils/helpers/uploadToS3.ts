import axios from 'axios';

export async function uploadToS3(file: File, s3URL: string) {
  console.log(`🚀 ~ file: uploadToS3.ts ~ line 2 ~ uploadToS3 ~ file`, file);
  try {
    /*  const url = await axios.put(s3URL, file, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
 */
    const url = await fetch(s3URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: file,
    });
    console.log(`🚀 ~ file: uploadToS3.ts ~ line 10 ~ uploadToS3 ~ url`, url);
    return url;
  } catch (err) {
    console.error(err);
    return err;
  }
}
