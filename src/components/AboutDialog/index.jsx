import React from "react";
import { FormattedMessage } from "react-intl";
import {
  Dialog,
  DialogTitle as MuiDialogTitle,
  DialogContent,
  DialogContentText,
  IconButton,
  Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

export default function AboutDialog(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="about-dialog-title"
      >
        <DialogTitle id="about-dialog-title">
          <FormattedMessage id="about.title" defaultMessage="The Mao Kun Map" />
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {" "}
            The{" "}
            <a
              href="https://en.wikipedia.org/wiki/Mao_Kun_map"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mao Kun map
            </a>{" "}
            was compiled in 1621 across many pages of the book{" "}
            <a
              href="https://en.wikipedia.org/wiki/Wubei_Zhi"
              target="_blank"
              rel="noopener noreferrer"
            >
              Wubei Zhi
            </a>
            . It's name is believed to be derived from the owner of the library
            where it was compiled. It's sources include records from many
            voyages, but the most famous of these were the treasure fleets of{" "}
            <a
              href="https://en.wikipedia.org/wiki/Zheng_He"
              target="_blank"
              rel="noopener noreferrer"
            >
              Zheng He
            </a>{" "}
            (between 1405 and 1433). Because of this, the map is commonly
            referred to as Zheng He's Navigation Map (鄭和航海圖) in modern
            Chinese. It is the earliest Chinese map to portray an adequate
            representation of Southern Asia, Persia, Arabia and East Africa.
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
