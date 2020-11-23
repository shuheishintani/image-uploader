import { useState, useCallback, ChangeEvent } from 'react';
import Image from 'next/image';
import ProgressBar from '@/components/ProgressBar';
import { useDropzone } from 'react-dropzone';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  Grid,
  Typography,
  Button,
  Box,
  Icon,
  IconButton,
} from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import {
  CheckCircle as CheckCircleIcon,
  FileCopy as FileCopyIcon,
} from '@material-ui/icons';

const useStyles = makeStyles(() =>
  createStyles({
    gridContainer: {
      minHeight: '100vh',
    },
    outerBox: {
      'box-shadow': '0px 0px 10px #999',
      backgroundColor: '#fff',
      minWidth: '400px',
    },
    innerBox: {
      backgroundColor: '#f6f8fb',
      width: '400px',
      height: '300px',
      border: '1px dashed #97bef4',
      borderRadius: '16px',
    },
    uploadedImg: {
      borderRadius: '16px',
    },
    checkCircleIcon: {
      color: '#22bb33',
    },
  })
);

export default function Home() {
  const classes = useStyles();
  const [file, setFile] = useState<File>(null);
  const [error, setError] = useState<string>(null);
  const [uploading, setUploading] = useState<'ready' | 'uploading' | 'done'>(
    'ready'
  );
  const [url, setUrl] = useState<string>(null);

  const onDrop = useCallback(acceptedFiles => {
    const selectedFile = acceptedFiles[0];

    if (selectedFile && (selectedFile.type === 'image/png' || 'image/jpeg')) {
      setFile(selectedFile);
      setUploading('uploading');
    } else {
      setFile(null);
      setError('Please select an image file (png or jpeg)');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const selectFileHandler: (
    e: ChangeEvent<HTMLInputElement>
  ) => void = useCallback(e => {
    const selectedFile = e.target.files[0];

    if (selectedFile && (selectedFile.type === 'image/png' || 'image/jpeg')) {
      setFile(selectedFile);
      setUploading('uploading');
    } else {
      setFile(null);
      setError('Please select an image file (png or jpeg)');
    }
  }, []);

  console.log(url);

  return (
    <>
      <Grid
        container
        alignItems="center"
        justify="center"
        className={classes.gridContainer}
      >
        <Grid item>
          <Box borderRadius={16} className={classes.outerBox}>
            <Box p={5}>
              {uploading === 'ready' && (
                <Grid container direction="column" alignItems="center">
                  <Typography variant="h5">Upload your Image</Typography>
                  <Typography variant="subtitle2">
                    File should be Jpeg, Png...
                  </Typography>

                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Box className={classes.innerBox}>
                      <Grid container direction="column" alignItems="center">
                        <Image
                          src="/image.svg"
                          alt="image"
                          width={200}
                          height={100}
                        />
                        <Typography color="textSecondary">
                          Drag & Drop your image here
                        </Typography>
                        {isDragActive && <p>onDrag</p>}
                      </Grid>
                    </Box>
                  </div>

                  <Typography variant="subtitle2" color="textSecondary">
                    Or
                  </Typography>

                  <Button variant="contained" color="primary" component="label">
                    Choose a file
                    <input type="file" onChange={selectFileHandler} hidden />
                  </Button>
                  {error && (
                    <Typography variant="subtitle2">{error}</Typography>
                  )}
                </Grid>
              )}
              {uploading === 'uploading' && (
                <>
                  <Typography variant="subtitle2">Uploading...</Typography>
                  <ProgressBar
                    file={file}
                    setFile={setFile}
                    setUploading={setUploading}
                    setUrl={setUrl}
                  />
                </>
              )}
              {uploading === 'done' && (
                <>
                  <Icon className={classes.checkCircleIcon}>
                    <CheckCircleIcon />
                  </Icon>
                  <Typography variant="subtitle1">
                    Uploaded Successfully!
                  </Typography>
                  <img
                    src={url}
                    alt="upload-img"
                    width="400px"
                    height="300px"
                    className={classes.uploadedImg}
                  />
                  <Box m={1} />
                  {/* <TextField
                    value={url}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="filled"
                  /> */}
                  <CopyToClipboard text={url}>
                    <IconButton>
                      <FileCopyIcon />
                    </IconButton>
                  </CopyToClipboard>
                </>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
