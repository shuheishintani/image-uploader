import { FC, useCallback, Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { Grid, Typography, Box } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    innerBox: {
      backgroundColor: '#f6f8fb',
      width: '400px',
      height: '300px',
      border: '1px dashed #97bef4',
      borderRadius: '16px',
    },
  })
);

type Props = {
  setFile: Dispatch<SetStateAction<File | null>>;
  setUploading: Dispatch<SetStateAction<'ready' | 'uploading' | 'done'>>;
  setError: Dispatch<SetStateAction<string>>;
};

const DropZone: FC<Props> = ({ setFile, setError, setUploading }) => {
  const classes = useStyles();
  const onDrop = useCallback(
    acceptedFiles => {
      const selectedFile: File = acceptedFiles[0];
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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <Box className={classes.innerBox}>
        <Grid container direction="column" alignItems="center">
          <Box m={5}>
            <Image src="/image.svg" alt="image" width={200} height={100} />
          </Box>
          <Typography color="textSecondary">
            Drag & Drop your image here
          </Typography>
          {isDragActive && <p>onDrag</p>}
        </Grid>
      </Box>
    </div>
  );
};

export default DropZone;
