import React, { useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';

import { MyToolbar, MyTable, LatestOrders} from './components';
import axios from 'axios';
import { Grid } from '@material-ui/core';
import moment from 'moment';

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

const Laporan = () => {
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

  const params = {
    include: [
      {
        relation: "user"
      
      },
   {
        relation: "inventory"
      }
    ]
  };

  useEffect(() => {

    
 

    const fetchData = async () => {
      const result = await axios({
        method: "get",
        url: `${moduleConfigs.server}/order-inventories?filter=${JSON.stringify(params)}`,
       
      });
      setData(result.data);
    };
    fetchData();
  }, []);

  const filterDataByDate = async (dataFilter) => {
    

    let fixParams = params;

    if(dataFilter.startDate && dataFilter.endDate){
      fixParams = {
        ...params,
        where: {
          and:[ { tgl_input: {
        gt:new Date(moment(dataFilter.startDate).subtract(1,'seconds').format())
       }},
       { tgl_input: {
        lt:new Date(moment(dataFilter.endDate).add(1,"days").subtract(1,'seconds').format())
       }}
       ]
          
       }
      }
    }

    const result = await axios({
      method: "get",
      url: `${moduleConfigs.server}/order-inventories?filter=${JSON.stringify(fixParams)}`,
     
    });
    setData(result.data);
  };

  

  return (
    <div className={classes.root}>
      <MyToolbar rangedDataInputOnClick={filterDataByDate} />
      <div className={classes.content}>
      <Grid
        container
        spacing={4}
      >
       
        <Grid
          item
          lg={12}
          md={12}
          xl={3}
          xs={12}
        >
            <LatestOrders data={data} />
        </Grid>
        
      </Grid>
      </div>
    </div>
  );
};

export default Laporan;
