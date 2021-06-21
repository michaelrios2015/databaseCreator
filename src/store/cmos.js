import axios from 'axios';

const LOAD_ROWS = 'LOAD_ROWS';

const loadData = (arr) => {

    function createData(id, year, deal, group, cpr, cprNext, vpr, vprNext, cdr, cdrNext, currFace, residual, actualCpr) {
        return {id, year, deal, group, cpr, cprNext, vpr, vprNext, cdr, cdrNext, currFace, residual, actualCpr };
    }

    const rows= [];

    arr.forEach(item => {
        rows.push(createData(item.id, item.year, item.deal, item.group, item.cmobodies[0].cpr, item.cmobodies[0].cprNext, item.cmobodies[0].vpr, item.cmobodies[0].vprNext, item.cmobodies[0].cdr, 
        item.cmobodies[0].cdrNext, item.cmobodies[0].currFace, item.cmobodies[0].residual, item.cmobodies[0].actualCpr))
    });

    return rows;
}

const rowsReducer = (state = [], action) =>{
    if (action.type === LOAD_ROWS){
        state = action.rows
    }

    return state;
}

const _loadRows = (rows) =>{
    return {
        type: LOAD_ROWS,
        rows
    };
};


export const loadRowsByYear = (year, month) =>{

    // there
    if(!year){
        year = '2021';
    }
    if(!month){
        month = 'FEB';
    }

    console.log(month);

    return async(dispatch)=>{
        const tests = (await axios.get(`/api/cmos/year/${year}/${month}`)).data;
        // console.log(tests) 
        dispatch(_loadRows(loadData(tests)));
    }
};


export const loadDataByDealandGroup = (deal, group, year, month) =>{
    
    console.log(month);
    return async(dispatch)=>{
        console.log('---------------in loadDataByGroup dispath ----------');
        let data = [];
        if (deal === 'All' && group === 'All'){
            data = (await axios.get(`/api/cmos/year/${year}/${month}`)).data;
        }
        else {
            data = (await axios.get(`/api/cmos/dealandgroup/${deal}/${group}/${year}/${month}`)).data;
        }
        console.log(data);
        dispatch(_loadRows(loadData(data)));
    }
};

export { rowsReducer };



