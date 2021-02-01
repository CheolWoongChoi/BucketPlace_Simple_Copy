import * as React from 'react';
import * as ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import App from './src/App';
import rootReducer from './src/store';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

const store = createStore(
	rootReducer,
	composeWithDevTools(
		applyMiddleware(thunk)
	)
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