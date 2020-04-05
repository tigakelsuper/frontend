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
import axios from 'axios'

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
  const { className,history,datasupir,datapemesanan, ...rest } = props;


  const classes = useStyles();

  const [age, setAge] = React.useState('');
   
  const handleChange = (event) => {

    setAge(event.target.value);
    updateSupir(history,event.target.value);
  };

  const updateSupir = async (history,supirId) =>  {
 
 
    try {
      const response = await axios.put(`http://localhost:3000/pemesanan-mobils/${datapemesanan.id}`, {
        tanggal_pemesanan:datapemesanan.tanggal_pemesanan,
tipe_pemesanan:datapemesanan.tipe_pemesanan,
keterangan:datapemesanan.keterangan,
status_pemesanan:'alocated',
userId:datapemesanan.user.id,
mobilId:datapemesanan.mobil.nomor_polisi,
supirId:parseInt(supirId)
      });
     
      history.push('/pemesanan-mobil');
    } catch (e) {
      console.log(`Axios request failed: ${e}`);
    }
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
          {datasupir.map(item=>(
               <MenuItem value={item.id}>{item.nama}</MenuItem>
          ))}
         
         
        </Select>
      </FormControl>
  );
};

MySelectSupir.propTypes = {
  history:PropTypes.any,
  className: PropTypes.string
};

export default MySelectSupir;
