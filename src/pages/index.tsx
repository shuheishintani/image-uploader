import { useState, ChangeEvent } from 'react';
import Image from 'next/image';
import ProgressBar from '@/components/ProgressBar';
import { Grid, Typography, Button, Box } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

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

  const selectFileHandler: (e: ChangeEvent<HTMLInputElement>) => void = e => {
    const selectedFile = e.target.files[0];

    if (selectedFile && (selectedFile.type === 'image/png' || 'image/jpeg')) {
      setFile(selectedFile);
      setUploading('uploading');
    } else {
      setFile(null);
      setError('Please select an image file (png or jpeg)');
    }
  };

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
                    </Grid>
                  </Box>
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
                <ProgressBar
                  file={file}
                  setFile={setFile}
                  setUploading={setUploading}
                  setUrl={setUrl}
                />
              )}
              {uploading === 'done' && (
                <img src={url} alt="upload-img" width="400px" height="300px" />
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
