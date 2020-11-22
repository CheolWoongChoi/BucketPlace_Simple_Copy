import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import App from './src/App';
import rootReducer from './src/store/reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
	rootReducer, 
	compose(applyMiddleware(thunk), composeWithDevTools())
);

ReactDOM.render(
	<Provider store={store}>
		<SnackbarProvider 
			maxSnack={1} 
			anchorOrigin={{ vertical: 'top', horizontal: 'center'}}
		>
			<App />
		</SnackbarProvider>
	</Provider>,
	document.querySelector('#root')
);