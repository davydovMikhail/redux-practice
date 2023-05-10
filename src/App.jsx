import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { addCustomerAction, removeCustomerAction } from './store/customerReducer';
import { fetchCustomers } from './asyncActions/customers';

function App() {
  const dispatch = useDispatch()
  const cash = useSelector(state => state.cash.cash)
  const customers = useSelector(state => state.customer.customers)

  const addCash = (cash) => {
    dispatch({type: "ADD_CASH", payload: cash})
  }

  const getCash = (cash) => {
    dispatch({type: "GET_CASH", payload: cash})
  }

  const addCustomer = (name) => {
    const customer = {
      name,
      id: Date.now(),
    }
    dispatch(addCustomerAction(customer))
  }

  const removeCustomer = (customer) => {
    dispatch(removeCustomerAction(customer.id))
  }

  return (
    <div className="App">
      <div>{cash}</div>
      <div>
        <button onClick={() => addCash(Number(prompt()))}>Пополнить</button>
        <button onClick={() => getCash(Number(prompt()))}>Снять</button>
        <button onClick={() => addCustomer(prompt())}>Добавить клиента</button>
        <button onClick={() => dispatch(fetchCustomers())}>Получить клиентов из базы</button>
      </div>
      {customers.length > 0 ?
        <div>
          {customers.map(customer => 
            <div onClick={() => removeCustomer(customer)} >
              {customer.name}
            </div>  
          )}
        </div>
        :
        <div>
          Клиенты отсутствуют
        </div>
      }
      
    </div>
  );
}

export default App;
