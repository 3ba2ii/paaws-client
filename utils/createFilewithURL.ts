export async function createFileWithURL(url: string): Promise<File | null> {
  try {
    let response = await fetch(url);
    let data = await response.blob();
    let metadata = {
      type: 'image/jpeg',
    };
    return new File([data], 'initial.jpg', metadata);
  } catch (e) {
    return null;
  }
}
