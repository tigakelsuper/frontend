const roles = {
  pegawai : ['John'],
  atasanPegawai:['Bob'],
  hco: ['Jane']
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
