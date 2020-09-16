import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  Drawer,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Tooltip,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MapIcon from '@material-ui/icons/Map';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';

import { LocaleContext } from '../../LocaleContext';
import KamalDetails from './KamalDetails';
import WikipediaButtonGroup, { WikipediaIcon } from './WikipediaButtonGroup';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {},
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiBackdrop-root': { backgroundColor: 'transparent' },
  },
  drawerPaper: { width: drawerWidth, height: 'auto', marginTop: 75 },
  translation: { color: '#888', fontSize: '0.8em' },
  otherNames: { color: '#888', fontSize: '0.8em' },
}));

function PointDetails(props) {
  const classes = useStyles();
  const intl = useIntl();
  const [locale] = React.useContext(LocaleContext);

  if (!props.geojson.features.length || !props.id) {
    return null;
  }

  const { properties, geometry } = props.geojson.features.find(
    ({ properties: { id } }) => id === props.id
  );

  return (
    <Drawer
      anchor="right"
      open={!!props.id}
      onClose={props.onClose}
      className={classes.drawer}
      classes={{ paper: classes.drawerPaper }}
    >
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {properties.label}
          </Typography>
          <Typography variant="body2" component="p" className={classes.pinyin}>
            {properties.pinyin}
          </Typography>
          <Typography
            variant="body2"
            component="p"
            className={classes.translation}
          >
            {properties.translation}
          </Typography>
          <Typography
            variant="caption"
            component="p"
            className={classes.category}
          >
            <FormattedMessage
              id={`categories.${properties.category.toLowerCase()}`}
              defaultMessage={properties.category}
            />
          </Typography>

          <hr />
          <Typography variant="h5" component="h2">
            {locale === 'en' ? properties.nameEn : properties.nameTc}
          </Typography>
          <Typography variant="body2" component="p" className={classes.region}>
            {properties.region && (
              <FormattedMessage
                id={`regions.${properties.region.toLowerCase()}`}
                defaultMessage={properties.region}
              />
            )}
          </Typography>
          <Typography
            variant="body2"
            component="p"
            className={classes.otherNames}
            title={intl.formatMessage({
              id: 'details.aka',
              defaultMessage: 'also known as',
            })}
          >
            {locale === 'en' ? properties.othersEn : properties.othersTc}
          </Typography>

          <KamalDetails
            text={properties.kamalNotes}
            angle={geometry.kamalAngle}
          />
        </CardContent>
        <CardActions>
          {geometry.coordinates.length > 0 && (
            <Tooltip
              title={intl.formatMessage({
                id: 'details.googleMaps',
                defaultMessage: 'View in Google Maps',
              })}
            >
              <IconButton
                component="a"
                href={`https://www.google.com/maps/place/${geometry.coordinates[1]},${geometry.coordinates[0]}/@${geometry.coordinates[1]},${geometry.coordinates[0]},12z`}
                target="_blank"
              >
                <MapIcon />
              </IconButton>
            </Tooltip>
          )}
          {properties.sourceUrl && (
            <Tooltip
              title={intl.formatMessage({
                id: 'details.reference',
                defaultMessage: 'View reference',
              })}
            >
              <IconButton
                component="a"
                href={properties.sourceUrl}
                target="_blank"
              >
                <LocalLibraryIcon />
              </IconButton>
            </Tooltip>
          )}
          {(properties.wikiEn || properties.wikiZh) &&
            (properties.wikiEn && properties.wikiZh ? (
              <WikipediaButtonGroup {...properties} />
            ) : (
              <Tooltip
                title={intl.formatMessage({
                  id: 'details.reference',
                  defaultMessage: 'View reference',
                })}
              >
                <IconButton
                  component="a"
                  href={properties.wikiEn || properties.wikiZh}
                  target="_blank"
                >
                  <WikipediaIcon />
                </IconButton>
              </Tooltip>
            ))}
        </CardActions>
      </Card>
    </Drawer>
  );
}

export default PointDetails;
