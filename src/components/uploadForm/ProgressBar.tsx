import { FC, useEffect, Dispatch, SetStateAction } from 'react';
import useStorage from '@/hooks/useStorage';
import { makeStyles } from '@material-ui/core/styles';

import LinearProgress, {
  LinearProgressProps,
} from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

const LinearProgressWithLabel = (
  props: LinearProgressProps & { value: number }
) => {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
};

type Props = {
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
  setUploading: Dispatch<SetStateAction<'ready' | 'uploading' | 'done'>>;
  setUrl: Dispatch<SetStateAction<string>>;
};

const ProgressBar: FC<Props> = ({ file, setFile, setUploading, setUrl }) => {
  const classes = useStyles();
  const { url, progress } = useStorage(file);

  useEffect(() => {
    if (url) {
      setFile(null);
      setUploading('done');
    }
    return () => {
      setUrl(url);
    };
  }, [setFile, setUploading, setUrl, url]);

  return (
    <div className={classes.root}>
      <LinearProgressWithLabel value={progress} />
    </div>
  );
};

export default ProgressBar;
