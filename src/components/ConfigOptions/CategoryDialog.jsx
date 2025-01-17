import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormGroup,
  FormControlLabel,
} from '@material-ui/core';
import ShowIcon from '@material-ui/icons/Visibility';
import HideIcon from '@material-ui/icons/VisibilityOff';

import CATEGORIES from './categories-colors.json';
import ColoredSwitch from './ColoredSwitch';

const useStyles = makeStyles((theme) => ({
  toggleAll: {
    '& .MuiButton-startIcon': {
      marginLeft: 0,
      marginRight: '18px',
    },
  },
}));

export default function CategoryDialog(props) {
  const intl = useIntl();
  const classes = useStyles();
  const { categories = {} } = props;

  const allVisible = Object.keys(CATEGORIES).reduce(
    (agg, cur) => agg && categories[cur],
    true
  );

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        <FormattedMessage
          id="config.chooseCategories"
          defaultMessage="Choose Overlay Categories"
        />
      </DialogTitle>
      <DialogContent>
        <FormControl component="fieldset">
          <FormGroup>
            {Object.entries(CATEGORIES).map(([category, color]) => (
              <FormControlLabel
                key={category}
                control={
                  <ColoredSwitch
                    color={color}
                    checked={categories[category]}
                    onChange={() =>
                      props.onChange(category, !categories[category])
                    }
                    name={category}
                  />
                }
                label={intl.formatMessage({
                  id: `categories.${category}`,
                  defaultMessage: category,
                })}
              />
            ))}
          </FormGroup>
          {allVisible ? (
            <Button
              className={classes.toggleAll}
              startIcon={<HideIcon />}
              onClick={() => props.onChange(null, false)}
            >
              Switch all off
            </Button>
          ) : (
            <Button
              className={classes.toggleAll}
              startIcon={<ShowIcon />}
              onClick={() => props.onChange(null, true)}
            >
              Switch all on
            </Button>
          )}
        </FormControl>
      </DialogContent>
    </Dialog>
  );
}
