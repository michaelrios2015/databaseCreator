import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension'
import { rowsReducer } from './cmos';
import { poolsReducer } from './pools';


// the reducer
const reducer = combineReducers({
    rows: rowsReducer,
    pools: poolsReducer
})

//think this is just a fancy logger but not sure
const middleware = composeWithDevTools(
    applyMiddleware(thunk, createLogger({collapsed: true}))
  )
const store = createStore(reducer, middleware);


export default store;
export * from './cmos'
export * from './pools'


