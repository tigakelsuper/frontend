import React, { useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';

import { MyToolbar, MyTable } from './components';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

export const moduleConfigs = {
  server:'http://localhost:3000',
  name:'user-management',
  nameForLabelInfo:'User',
  route:'user',
  label:{
    addNew:'Silahkan menginput informasi User'
  },
  statusList:{
    available:'available'
  }

};

const User = () => {
  const classes = useStyles();

  const [data,setData] = useState([]);
  const [dataSupir,setDataSupir] = useState([]);

  const approveAction = async (history,datatransaksi,dataIndex) =>  {

    let {user,mobil,...updatedFields} = datatransaksi 
    const transaksiForApprove = {
      ...updatedFields,
      status_pemesanan: 'approved',
      userId : datatransaksi.user.id,
      mobilId: datatransaksi.mobil.nomor_polisi
    }

    const approveForTable = {
      ...datatransaksi,
      status_pemesanan: 'approved',
    }

    const newData = [
      ...data.slice(0,dataIndex),
      approveForTable,
      ...data.slice(dataIndex+1)

    ];
 
 
    try {
      const response = await axios.put(`${moduleConfigs.server}/${moduleConfigs.name}/${datatransaksi.id}`,transaksiForApprove);
       alert(`${moduleConfigs.nameForLabelInfo} berhasil di setujui.`);
       setData(newData);
    } catch (e) {
      console.log(`Axios request failed: ${e}`);
    }
  };

  const cancelAction = async (history,datatransaksi,dataIndex) =>  {
 


  
    // let {user,ruangMeeting,...updatedFields} = datatransaksi 
    // const transaksiForCancel = {
    //   ...updatedFields,
    //   status: 'cancelled'
    // }

    // const cancelForTable = {
    //   ...datatransaksi,
    //   status: 'cancelled',
    // }

    const newData = [
      ...data.slice(0,dataIndex),
      ...data.slice(dataIndex+1)
    ];

    try {
      const response = await axios.delete(`${moduleConfigs.server}/${moduleConfigs.name}/${datatransaksi.id}`);
     
      alert(`${moduleConfigs.nameForLabelInfo} berhasil dihapus.`);
      setData(newData);
    } catch (e) {
      console.log(`Axios request failed: ${e}`);
    }
  };

  useEffect(() => {
 

    const fetchData = async () => {
      const result = await axios({
        method: "get",
        url: `${moduleConfigs.server}/${moduleConfigs.name}`,
       
      });
      setData(result.data);
    };
    fetchData();
  }, []);

  

  return (
    <div className={classes.root}>
      <MyToolbar />
      <div className={classes.content}>
        <MyTable data={data} cancelAction={cancelAction} approveAction={approveAction} />
      </div>
    </div>
  );
};

export default User;
