import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';

import { RangedDateInput } from 'components';
import { withRouter } from 'react-router-dom';
import {moduleConfigs} from '../../../../Laporan/Laporan';
import { useAuth } from "./../../../../../auth/auth";
import { isHCO } from 'hakakses/hakakses';
import {getUserInfoFromToken} from './../../../../../mymixin/mymixin';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1),
    marginBottom:'40px'
  }
}));

const MyToolbar = props => {
  const { className,history,rangedDataInputOnClick, ...rest } = props;

  const { authTokens } = useAuth();

  


  const classes = useStyles();

  const MyButton = withRouter(({ history,text,route}) => (
    <Button
       color="primary"
          variant="contained"
      onClick={() => { history.push(`/${moduleConfigs.route}/${route}`) }}
    >
     {text}
    </Button>
  ))

  const userInfo = getUserInfoFromToken(authTokens);
  const {id,name} = userInfo;
  const showMyAddButton = isHCO(name);

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <span className={classes.spacer} />
{/*        
        <MyButton route='inventaris' text='Permintaan Inventaris' />
        <MyButton route='ruang-meeting' text='Ruang Meeting' />
        <MyButton route='catering' text='Catering' />
        <MyButton route='pemesanan-mobil' text='Pemesanaan Mobil' />
         */}

       
      </div>
      <div className={classes.row}>
      <RangedDateInput
          myLabel="Date Range"
          className={classes.searchInput}
          placeholder="Search Catering"
          buttonLabel = "Show Report"
          onClick={rangedDataInputOnClick}
        />
      </div>
    </div>
  );
};

MyToolbar.propTypes = {
  history:PropTypes.any,
  className: PropTypes.string
};

export default MyToolbar;
