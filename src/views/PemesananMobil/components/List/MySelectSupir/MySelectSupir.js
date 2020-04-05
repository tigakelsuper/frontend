import React,{useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button,   TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem} from '@material-ui/core';

import { SearchInput } from 'components';
import { withRouter } from 'react-router-dom'

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
    marginRight: theme.spacing(1)
  }
}));

const MySelectSupir = props => {
  const { className,history, ...rest } = props;


  const classes = useStyles();

  const [age, setAge] = React.useState('');
   
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <FormControl variant="filled">
         <InputLabel id="demo-simple-select-filled-label">Pilih Supir</InputLabel>
         <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value = {age}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
  );
};

MySelectSupir.propTypes = {
  history:PropTypes.any,
  className: PropTypes.string
};

export default MySelectSupir;
