import React, { useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';

import { MyToolbar, MyTable, Budget,
  TotalUsers,
  TasksProgress,
  TotalProfit,
  LatestSales,
  UsersByDevice,
  LatestProducts,
  LatestOrders} from './components';
import axios from 'axios';
import { Grid } from '@material-ui/core';

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
  name:'-',
  nameForLabelInfo:'Laporan',
  route:'laporan',
  label:{
    addNew:'-'
  },
  statusList:{
    available:'available'
  }

};

const LaporanSummary = () => {
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
 


  
    let {user,ruangMeeting,...updatedFields} = datatransaksi 
    const transaksiForCancel = {
      ...updatedFields,
      status: 'cancelled'
    }

    const cancelForTable = {
      ...datatransaksi,
      status: 'cancelled',
    }

    const newData = [
      ...data.slice(0,dataIndex),
      cancelForTable,
      ...data.slice(dataIndex+1)

    ];

    try {
      const response = await axios.put(`${moduleConfigs.server}/${moduleConfigs.name}/${datatransaksi.id_meeting_room_res}`,transaksiForCancel);
     
      alert(`${moduleConfigs.nameForLabelInfo} berhasil dibatalkan.`);
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
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={4}
          sm={6}
          xl={3}
          xs={12}
        >
          <Budget />
        </Grid>
        <Grid
          item
          lg={4}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalUsers />
        </Grid>
        <Grid
          item
          lg={4}
          sm={6}
          xl={3}
          xs={12}
        >
          <TasksProgress />
        </Grid>
       
        <Grid
          item
          lg={6}
          md={12}
          xl={9}
          xs={12}
        >
          <LatestSales />
        </Grid>
        <Grid
          item
          lg={3}
          md={6}
          xl={3}
          xs={12}
        >
          <UsersByDevice title="Inventory In" />
        </Grid>
        <Grid
          item
          lg={3}
          md={6}
          xl={3}
          xs={12}
        >
          <UsersByDevice  title="Inventory Out"  />
        </Grid>
        
      </Grid>
      </div>
    </div>
  );
};

export default LaporanSummary;
