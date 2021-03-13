import * as React from 'react';
import { createStore } from 'redux';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import { render as rtlRender } from '@testing-library/react';
import { default as reducer, initialState } from 'store/card/reducer';

type Options = {
	initialState?: any,
	renderOptions?: any
}

function render(ui: React.ReactElement, options?: Options) {
	const store = createStore(
		reducer, 
		options?.initialState || initialState
	);
	
	function Wrapper({ children }: { children?: React.ReactNode }) {
		return (
			<Provider store={store}>
				<SnackbarProvider
					maxSnack={1} 
					anchorOrigin={{ vertical: 'top', horizontal: 'center'}}
				>
					{children}
				</SnackbarProvider>
			</Provider>
		)
	}

	return rtlRender(ui, { wrapper: Wrapper, ...options?.renderOptions })
}

export * from '@testing-library/react';
export { render }