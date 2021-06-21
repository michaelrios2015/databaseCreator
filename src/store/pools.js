import axios from 'axios';

const LOAD_POOLS = 'LOAD_POOLS';

const loadData = (arr) => {

    function createData
    (cusip, name, type, indicator, issueDate, maturityDate, originalFace, isTBAElig, interestRate, 
         remainingBalance, factor, GWAC, WAM, WALA, totalOutstanding, vpr, vprNext, cdr, cdrNext, cpr, cprNext, currentFace, va) 
    {
        return { 
                cusip, name, type, indicator, issueDate, maturityDate, originalFace, isTBAElig, interestRate,  
                remainingBalance, factor, GWAC, WAM, WALA, totalOutstanding, vpr, vprNext, cdr, cdrNext, cpr, cprNext, currentFace, va 
                };
    }

    const rows= [];

    console.log(arr);

    try {
    // arr.forEach(item => {
    //     rows.push(createData(item.cusip, item.name, item.type, item.indicator, item.issueDate, item.maturityDate, 
    //         item.originalFace, item.isTBAElig, item.poolbodies[0].interestRate, item.poolbodies[0].remainingBalance,  
    //         item.poolbodies[0].factor, item.poolbodies[0].GWAC, item.poolbodies[0].WAM, item.poolbodies[0].WALA,
            
    //         item.poolbodies[0].poolprediction.totalOutstanding, item.poolbodies[0].poolprediction.vpr, item.poolbodies[0].poolprediction.vprNext, 
            
    //         item.poolbodies[0].poolprediction.cdr, item.poolbodies[0].poolprediction.cdrNext, item.poolbodies[0].poolprediction.cpr, 
    //         item.poolbodies[0].poolprediction.cprNext))
    // });

    arr.forEach(item => {
        rows.push(createData(item.cusip, item.name, item.type, item.indicator, item.issueDate, item.maturityDate, 
            item.originalFace, item.isTBAElig, item.interestRate, item.remainingBalance,  
            item.factor, item.GWAC, item.WAM, item.WALA, item.totalOutstanding, item.vpr, item.vprNext, 
            item.cdr, item.cdrNext, item.cpr, item.cprNext, item.currentFace, item.va))
    });
    }
    catch(err){
        console.log(err)
    }
    return rows;
}

const poolsReducer = (state = [], action) =>{
    if (action.type === LOAD_POOLS){
        state = action.pools
    }

    return state;
}

const _loadPools = (pools) =>{
    return {
        type: LOAD_POOLS,
        pools
    };
};


export const loadPools = () =>{

    return async(dispatch)=>{
        const tests = (await axios.get(`/api/pools/`)).data;
        console.log(tests[0]); 
        // so this will work to weed out ones that are null
        // tests.forEach(item => {if (!item.poolbodies[0].poolprediction){
        //     console.log(item)
        // }})
        tests.forEach(item => {
            item.totalOutstanding = (item.totalOutstanding).toFixed(2);
            item.vpr = (item.vpr * 100).toFixed(1);
            item.vprNext = (item.vprNext * 100).toFixed(1);
            item.cdr = (item.cdr * 100).toFixed(1);
            item.cdrNext = (item.cdrNext * 100).toFixed(1);
            item.cpr = (item.cpr * 100).toFixed(1);
            item.cprNext = (item.cprNext * 100).toFixed(1);
            item.issueDate = item.issueDate.toString().slice(0, 6);
            item.currentFace = ((item.originalFace * 1) * (item.factor * 1)).toFixed(2);
        })
        console.log(tests[0])    


        dispatch(_loadPools(loadData(tests)));
    }
};


// export const loadDataByDealandGroup = (deal, group, year, month) =>{
    
//     console.log(month);
//     return async(dispatch)=>{
//         console.log('---------------in loadDataByGroup dispath ----------');
//         let data = [];
//         if (deal === 'All' && group === 'All'){
//             data = (await axios.get(`/api/cmos/year/${year}/${month}`)).data;
//         }
//         else {
//             data = (await axios.get(`/api/cmos/dealandgroup/${deal}/${group}/${year}/${month}`)).data;
//         }
//         console.log(data);
//         dispatch(_loadRows(loadData(data)));
//     }
// };

export { poolsReducer };



