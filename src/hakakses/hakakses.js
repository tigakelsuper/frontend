const roles = {
  pegawai : ['John'],
  atasanPegawai:['Bob','Scarlet'],
  hco: ['Jane'],
  admin: ['Hatori'],
  atasanHCO:['Scarlet']
}

const moduleAccess = {
  pegawai: ['/dashboard','/order-inventory','/reservasi-ruang-meeting','/catering','/pemesanan-mobil'],
  atasanPegawai: ['/dashboard','/order-inventory','/reservasi-ruang-meeting','/catering','/pemesanan-mobil'],
  hco: ['/dashboard','/order-inventory','/reservasi-ruang-meeting','/catering','/pemesanan-mobil','/laporan'],
  admin: ['/dashboard','/order-inventory','/reservasi-ruang-meeting','/catering','/pemesanan-mobil','/user'],
  atasanHCO: ['/dashboard','/order-inventory','/reservasi-ruang-meeting','/catering','/pemesanan-mobil','/laporan-summary']
}

const profiles = {
  Jane : {
    avatar:'avatar_12.png',
    nickName:'Awan',
    position:'HCO Staff',
    departemen:'HRD',
    role:'hco'
  },
  Bob:{
    avatar:'avatar_3.png',
    nickName:'Budi',
    position:'IT Manager',
    departemen:'IT',
    role:'atasanPegawai'
  },
  John:{
    avatar:'avatar_8.png',
    nickName:'Ujang',
    position:'IT Staff',
    departemen:'IT',
    role:'pegawai'
  },
  Hatori:{
    avatar:'avatar_7.png',
    nickName:'Asep',
    position:'Admin',
    departemen:'IT',
    role:'admin'
  },
  Scarlet:{
    avatar:'avatar_2.png',
    nickName:'Scarlet',
    position:'HCO Manager',
    departemen:'HCO',
    role:'atasanHCO'
  }
}



export function isPegawai(username){
    if(roles.pegawai.includes(username)){
      return true;
    }
    return false;
};

export function isAtasanPegawai(username){
  if(roles.atasanPegawai.includes(username)){
    return true;
  }
  return false;
};

export function isHCO(username){
  if(roles.hco.includes(username)){
    return true;
  }
  return false;
};

export function isAdmin(username){
  if(roles.admin.includes(username)){
    return true;
  }
  return false;
};

export function getModuleAccess(role){
  return moduleAccess[role];
};



export function getProfile(username){
  return profiles[username];
}
