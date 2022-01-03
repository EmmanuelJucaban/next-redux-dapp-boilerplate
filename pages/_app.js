import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import reducers from "../redux/store";


const store = configureStore({
  reducer: reducers,
});

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
