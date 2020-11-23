import { FC, useCallback, ChangeEvent, Dispatch, SetStateAction } from 'react';
import { Button } from '@material-ui/core';

type Props = {
  setFile: Dispatch<SetStateAction<File>>;
  setUploading: Dispatch<SetStateAction<'ready' | 'uploading' | 'done'>>;
  setError: Dispatch<SetStateAction<string>>;
};

const SelectFileButton: FC<Props> = ({ setFile, setError, setUploading }) => {
  const selectFileHandler: (
    e: ChangeEvent<HTMLInputElement>
  ) => void = useCallback(
    e => {
      const selectedFile = e.target.files[0];

      if (selectedFile && (selectedFile.type === 'image/png' || 'image/jpeg')) {
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
