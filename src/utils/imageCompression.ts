import Compressor from 'compressorjs';
import { UseFormSetValue } from 'react-hook-form';
import { EditProfile } from '../pages/userProfile/EditProfile';

const imageCompression = (
  e: React.ChangeEvent<HTMLInputElement>,
  setValue: UseFormSetValue<EditProfile>
) => {
  const file = e.target.files?.[0];

  if (!file) return;

  let quality;

  if (file.size > 5 * 1024 * 1024) {
    quality = 0.4;
  } else if (file.size < 2 * 1024 * 1024) {
    quality = 0.6;
  } else {
    quality = 0.8;
  }

  new Compressor(file, {
    quality,
    success: (compressedFile) => {
      const newFile = new File([compressedFile], file.name, {
        type: compressedFile.type,
        lastModified: Date.now(),
      });
      setValue('icon', newFile, { shouldValidate: true });
    },
    error: (error) => {
      console.error(error.message);
    },
  });
};

export default imageCompression;
