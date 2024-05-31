export let initialState = {
  basket:
    JSON.parse(sessionStorage.getItem("basket")) === null
      ? []
      : JSON.parse(sessionStorage.getItem("basket")),
  user:
    JSON.parse(sessionStorage.getItem("user")) === null
      ? ""
      : JSON.parse(sessionStorage.getItem("user")),
  selection: "all",
  Subscribe: null,
  localshop: null,
  doctor: null,
  day: null,
  productView: [],
};

export const getBasketTotal = (basket) =>
  basket?.reduce(
    (amount, item) => item.product.productprice * item.quantity + amount,
    0
  );

  export const getretailerBasketTotal = (basket) =>
  basket?.reduce(
    (amount, item) => item.product.retailerofferPrice * item.quantity + amount,
    0
  );

export const gettaxtotal = (basket) =>
  basket?.reduce(
    (amount, item) =>
      (item.product.productprice * item.quantity * item.product.tax) / 100 +
      amount,
    0
  );

const StoreReducer = (state = initialState, action) => {
  console.log("action", action);

  
  switch (action.type) {
    case "addBasketItem":
      const index = state.basket.findIndex(
        (element) => element.product._id === action.item.product._id
      ); //.indexOf(action.item);

      if (index !== -1) {
        let value = state.basket[index];
        action.item.quantity = parseInt(value.quantity) + 1;
        //return{...state,basket:[...state.basket.splice(index,1,action.item)]};
        state.basket.splice(index, 1);
      }
      let newBasket = [...state.basket];
      newBasket.push(action.item);
      sessionStorage.setItem("basket", JSON.stringify(newBasket));
      return { ...state, basket: newBasket }; //[...state.basket,action.item]};

     case "deleteBasketItem":
      const del = state.basket.indexOf(action.item);
      let delBasket = [...state.basket];
      delBasket.splice(del, 1);
      sessionStorage.setItem("basket", JSON.stringify(delBasket));
      return { ...state, basket: delBasket }; //:[...state.basket.splice(del,1)]};

     case "emptyBasket":
      sessionStorage.setItem("basket", null);
      return { ...state, basket: [] };

     case "addquantity":
      const incr = state.basket.indexOf(action.item);
     
      action.item.quantity = parseInt(action.item.quantity) + 1;
      let incBasket = [...state.basket];
	    incBasket[incr]=action.item;
      sessionStorage.setItem("basket", JSON.stringify(incBasket));

      return { ...state, basket: incBasket }; //[...state.basket,action.item]};//:[...state.basket,action.item]};
    //   }
    case "subquantity":
      const decr = state.basket.indexOf(action.item);
      
      if(parseInt(action.item.quantity) > parseInt(1)){
        action.item.quantity = parseInt(action.item.quantity) - 1;
      }
      
   
      let decBasket = [...state.basket];
      decBasket[decr]=action.item;
      sessionStorage.setItem("basket", JSON.stringify(decBasket));

      return { ...state, basket: decBasket }; //[...state.basket,action.item]};//:[...state.basket,action.item]};
    //   }
    case "setUser":
      sessionStorage.setItem("user", action.user);
      return { ...state, user: action.user };
    case "removeUser":
      sessionStorage.removeItem("user");
      return { ...state };
    case "Subscribe":
      return { ...state, Subscribe: action.item };
    case "localshop":
      return { ...state, localshop: action.item };
    case "doctor":
      return { ...state, doctor: action.item };
    case "day":
      return { ...state, day: action.item };
    case "add":
      action.item.quantity = parseInt(action.item.quantity) + 1;
      //  action.item.mrpprice = action.item.mrpprice * action.item.quantity;
      return { ...state, Subscribe: action.item };
    case "sub":
      action.item.quantity = parseInt(action.item.quantity) - 1;
      //  action.item.mrpprice = action.item.mrpprice * action.item.quantity;
      return { ...state, Subscribe: action.item };
    case "setSelection":
      return { ...state, selection: action.selection };

    case "setProductView":
      let value = [];
      value.push(action.item);
      return { ...state, productView: value };
      default:
      return state;
  }
};
export default StoreReducer;
