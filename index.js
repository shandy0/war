const fs = require('fs');

try {
    let data = fs.readFileSync('input.txt', 'utf8');
  //  console.log(data);   
    getTheRequiredArmy(data); 
} catch(e) {
    console.log('Error:', e.stack);
}

function getTheRequiredArmy(data){
    // Lengaburu -- L
    let L_H = 100;
    let L_E = 50;
    let L_AT = 10;
    let L_SG = 5;

    // Falicornia -- F

    let total =data.split(',');
    let F_H = parseInt(total[0].split(' ')[0]);
    let F_E = parseInt(total[1].trim().split(' ')[0]);
    let F_AT = parseInt(total[2].trim().split(' ')[0]);
    let F_SG = parseInt(total[3].trim().split(' ')[0]);

    // check if substution required
    let isSubReq = false;
    let finH = Math.ceil(F_H/2);
    let finE=Math.ceil(F_E/2);
    let finAT=Math.ceil(F_AT/2);
    let finSG=Math.ceil(F_SG/2);
    if(L_H*2 >= F_H && 2*L_E >= F_E && 2*L_AT >= F_AT && 2*L_SG >= F_SG){
        isSubReq= false;
    }
    else{
        isSubReq = true;
    }
    console.log(`INPUT:${F_H}H  ${F_E}E  ${F_AT}AT  ${F_SG}SG`);

    //required count
    let H_R=0;
    let E_R=0;
    let AT_R=0;
    let SG_R=0;



    // win
    let isWin= true;
    if(2*L_H<F_H){
    H_R = F_H-2*L_H;
    }
    if(2*L_E<F_E){
        E_R = F_E-2*L_E;
    }
    if(2*L_AT<F_AT){
        AT_R = F_AT-2*L_AT;
    }
    if(2*L_SG<F_SG){
        SG_R = F_SG-2*L_SG;
    }
    if(H_R>0){
        finH = L_H;
        if(  H_R > ((2*L_E - F_E )*2) ){
            isWin = false;
            finE =  L_E;
        }
        else{
          finE +=  Math.ceil(H_R/4);
        }
    }
    if(E_R>0){
        finE = L_E;
        if( E_R > ((2*L_AT - F_AT )*2)+((2*L_H - F_H )/2) ){
            isWin = false;
        }
        else{

            let rh = L_H-Math.ceil(F_H/2);
            if(E_R<=(rh/2)){
                finH+=E_R*2;
            }
            else{
              finH = L_H;
              finAT +=  Math.ceil(E_R - rh/2 )/2;
            }
        }
    }

    if(AT_R>0){
        finAT=L_AT;
       
        if( AT_R > ((2*L_SG - F_SG )*2)+((L_E-finE)*2  )/2 ){
            isWin = false;
        }
        else{

            let re = (L_E-finE)*2;
            if(AT_R<=(re/2)){
                finE +=  Math.ceil(AT_R/2);
            }
            else{
              finE = L_E;
              finSG +=   Math.ceil((AT_R - re/2 )/4);
            }
        }
    }

    if(SG_R>0){
        finSG=L_SG;
        if(  SG_R > ((L_AT - finAT )/2) ){
            isWin = false;
            finAT=L_AT;

        }
        else{
        
          finAT +=  SG_R*2;
        }
    }

    


    if (!isSubReq) {
    console.log(`Lengaburu deploys ${F_H/2}H  ${F_E/2}E  ${F_AT/2}AT  ${F_SG/2}SG and wins`)
    } else{
        if(isWin){
            console.log(`Lengaburu deploys ${finH}H  ${finE}E  ${finAT}AT  ${finSG}SG and wins`)
        }
        else{
            console.log(`Lengaburu deploys ${finH}H  ${finE}E  ${finAT}AT  ${finSG}SG and loses`)
        }
    }


}