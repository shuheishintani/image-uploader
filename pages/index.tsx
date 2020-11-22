import Image from 'next/image';
import { Grid, Typography, Button, Box } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    gridContainer: {
      minHeight: '100vh',
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

  return (
    <>
      <Grid
        container
        alignItems="center"
        justify="center"
        className={classes.gridContainer}
      >
        <Grid item>
          <Box boxShadow={5} borderRadius={16}>
            <Box p={5}>
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
                <Button variant="contained" color="primary">
                  Choose a file
                </Button>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
