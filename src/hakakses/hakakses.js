const roles = {
  pegawai : ['John'],
  atasanPegawai:['Bob'],
  hco: ['Jane']
}

const profiles = {
  Jane : {
    avatar:'avatar_12.png',
    nickName:'Awan',
    position:'HCO Staff'
  },
  Bob:{
    avatar:'avatar_3.png',
    nickName:'Budi',
    position:'IT Manager'
  },
  John:{
    avatar:'avatar_8.png',
    nickName:'Ujang',
    position:'IT Staff'
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

export function getProfile(username){
  return profiles[username];
}
