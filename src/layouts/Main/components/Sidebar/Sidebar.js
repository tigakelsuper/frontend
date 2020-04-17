import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ImageIcon from '@material-ui/icons/Image';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import DirectionCarIcon from '@material-ui/icons/DirectionsCar';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import AssessmentIcon from '@material-ui/icons/Assessment';
import LayersIcon from '@material-ui/icons/Layers';
import {isAdmin,getModuleAccess,getProfile} from './../../../../hakakses/hakakses';
import { useAuth } from "./../../../../auth/auth";
import {getUserInfoFromToken} from './../../../../mymixin/mymixin';



import { Profile, SidebarNav, UpgradePlan } from './components';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, className, ...rest } = props;

  const { authTokens } = useAuth();

  const classes = useStyles();

  const pages = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <DashboardIcon />

    },
    {
      title: 'User',
      href: '/user',
      icon: <PeopleIcon />
    },
    {
      title: 'Permintaan Inventaris',
      href: '/order-inventory',
      icon: <LayersIcon />
    },
    {
      title: 'Ruang Meeting',
      href: '/reservasi-ruang-meeting',
      icon: <MeetingRoomIcon />
    },
    {
      title: 'Catering',
      href: '/catering',
      icon: <FastfoodIcon />
    },
    {
      title: 'Pemesanan Mobil',
      href: '/pemesanan-mobil',
      icon: <DirectionCarIcon />
    },
    {
      title: 'Laporan',
      href: '/laporan',
      icon: <AssessmentIcon />
    },
    {
      title: 'Laporan Summary',
      href: '/laporan-summary',
      icon: <AssessmentIcon />
    }
  ];

  const userInfo = getUserInfoFromToken(authTokens);
  const {name} = userInfo;
  const profile = getProfile(name);
  const {role} = profile;
  const moduleAccess = getModuleAccess(role);

  const filteredPages = pages.filter(page=> moduleAccess.includes(page.href));


 

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav
          className={classes.nav}
          pages={filteredPages}
        />
        <UpgradePlan />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
