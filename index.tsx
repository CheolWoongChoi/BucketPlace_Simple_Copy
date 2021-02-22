import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SnackbarProvider } from 'notistack';
import App from './src/App';
import rootReducer, { rootSaga } from './src/store';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
	rootReducer,
	composeWithDevTools(
		applyMiddleware(
			thunk,
			sagaMiddleware,
			// logger
		)
	)
);

sagaMiddleware.run(rootSaga);

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