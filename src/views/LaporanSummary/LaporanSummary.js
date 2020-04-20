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
  const [dataInventori,setDataInventori] = useState([]);
  const [dataSupir,setDataSupir] = useState([]);

  const gdInventoryIn = {
    satu:{percent:15},
    dua:{percent:20},
    tiga:{percent:5},
    empat:{percent:50},
    lima:{percent:10}
  }

  const gdInventoryOut = {
    satu:{percent:30},
    dua:{percent:12},
    tiga:{percent:40},
    empat:{percent:6},
    lima:{percent:12}
  }

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
        url: `${moduleConfigs.server}/order-inventories`,
       
      });
      setData(result.data);
    
    };
    fetchData();

    const fetchDataInventory = async () => {
      const result = await axios({
        method: "get",
        url: `${moduleConfigs.server}/inventories`,
       
      });
      setDataInventori(result.data);
    
    };
    fetchDataInventory();
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
           {/* Total Transaction  */}
          <Budget total={data.length} /> 
         
        </Grid>
        <Grid
          item
          lg={4}
          sm={6}
          xl={3}
          xs={12}
        >
          {/* Inventori IN */}
          <TotalUsers total={dataInventori.length} />
        </Grid>
        <Grid
          item
          lg={4}
          sm={6}
          xl={3}
          xs={12}
        >
           {/* Inventori Out */}
          <TasksProgress total={dataInventori.length} />
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
          <UsersByDevice title="Inventory In" graphData={gdInventoryIn} />
        </Grid>
        <Grid
          item
          lg={3}
          md={6}
          xl={3}
          xs={12}
        >
          <UsersByDevice  title="Inventory Out" graphData={gdInventoryOut}  />
        </Grid>
        
      </Grid>
      </div>
    </div>
  );
};

export default LaporanSummary;
