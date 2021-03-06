import { FC, useCallback, ChangeEvent, Dispatch, SetStateAction } from 'react';
import { Button } from '@material-ui/core';

type Props = {
  setFile: Dispatch<SetStateAction<File | null>>;
  setUploading: Dispatch<SetStateAction<'ready' | 'uploading' | 'done'>>;
  setError: Dispatch<SetStateAction<string>>;
};

const SelectFileButton: FC<Props> = ({ setFile, setError, setUploading }) => {
  const selectFileHandler: (
    e: ChangeEvent<HTMLInputElement>
  ) => void = useCallback(
    e => {
      if (e.target.files === null) {
        return;
      }
      const selectedFile: File = e.target.files[0];
      const types: string[] = ['image/png', 'image/jpeg'];

      if (selectedFile && types.includes(selectedFile.type)) {
        setFile(selectedFile);
        setUploading('uploading');
      } else {
        setFile(null);
        setError('Please select an image file (png or jpeg)');
      }
    },
    [setError, setFile, setUploading]
  );

  return (
    <Button variant="contained" color="primary" component="label">
      Choose a file
      <input type="file" onChange={selectFileHandler} hidden />
    </Button>
  );
};

export default SelectFileButton;
