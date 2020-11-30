import { FC, useState } from 'react';
import Image from 'next/image';
import DropZone from '@/components/uploadForm/DropZone';
import ProgressBar from '@/components/uploadForm/ProgressBar';
import SelectFileButton from '@/components/uploadForm/SelectFileButton';
import CopyToClipboard from 'react-copy-to-clipboard';
import {
  Grid,
  Typography,
  Box,
  Icon,
  IconButton,
  OutlinedInput,
  InputAdornment,
  Tooltip,
  Button,
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
    outlinedInput: {
      width: '400px',
    },
  })
);

const UploadForm: FC = () => {
  const classes = useStyles();
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState<'ready' | 'uploading' | 'done'>(
    'ready'
  );
  const [url, setUrl] = useState('');
  const [openTip, setOpenTip] = useState(false);

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
                  <Box m={3}>
                    <Typography variant="subtitle2" color="textSecondary">
                      File should be Jpeg, Png...
                    </Typography>
                  </Box>

                  <DropZone
                    setFile={setFile}
                    setError={setError}
                    setUploading={setUploading}
                  />

                  <Box m={3}>
                    <Typography variant="subtitle2" color="textSecondary">
                      Or
                    </Typography>
                  </Box>

                  <SelectFileButton
                    setFile={setFile}
                    setUploading={setUploading}
                    setError={setError}
                  />

                  {error && (
                    <>
                      <Box m={2} />
                      <Typography variant="subtitle2" color="secondary">
                        {error}
                      </Typography>
                    </>
                  )}
                </Grid>
              )}
              {uploading === 'uploading' && (
                <>
                  <Typography variant="h5">Uploading...</Typography>
                  <Box m={2} />
                  <ProgressBar
                    file={file}
                    setFile={setFile}
                    setUploading={setUploading}
                    setUrl={setUrl}
                  />
                </>
              )}
              {uploading === 'done' && url && (
                <Grid container direction="column" alignItems="center">
                  <Icon className={classes.checkCircleIcon} fontSize="large">
                    <CheckCircleIcon fontSize="large" />
                  </Icon>
                  <Box m={1} />
                  <Typography variant="h5">Uploaded Successfully!</Typography>
                  <Box m={2} />
                  <Image
                    src={url}
                    alt="upload-img"
                    width="400px"
                    height="300px"
                    className={classes.uploadedImg}
                  />
                  <Box m={2} />
                  <OutlinedInput
                    type="text"
                    value={url}
                    readOnly={true}
                    className={classes.outlinedInput}
                    endAdornment={
                      <InputAdornment position="end">
                        <Tooltip
                          arrow
                          open={openTip}
                          onClose={() => setOpenTip(false)}
                          disableHoverListener
                          placement="top"
                          title="Copied!"
                        >
                          <CopyToClipboard text={url}>
                            <IconButton onClick={() => setOpenTip(true)}>
                              <FileCopyIcon />
                            </IconButton>
                          </CopyToClipboard>
                        </Tooltip>
                      </InputAdornment>
                    }
                  />
                  <Box m={2} />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setUploading('ready');
                      setUrl('');
                      setError('');
                    }}
                  >
                    Back Home
                  </Button>
                </Grid>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default UploadForm;
