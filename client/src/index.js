import React, {lazy} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {SnackbarProvider} from "./contexts/snackbar.context";
import {SlidingWindowProvider} from "./contexts/slidingWindow.context";
import {PopupProvider} from "./contexts/popup.context";
import ReactGA from 'react-ga4';

const MEASUREMENT_ID = "G-SW0T28HBEX";
ReactGA.initialize(MEASUREMENT_ID);

const root = ReactDOM.createRoot(document.getElementById('root'));

const queryClient = new QueryClient({});

root.render(
    // <React.StrictMode>
        <BrowserRouter>
            <PopupProvider options={{isActive: false}}>
                <QueryClientProvider client={queryClient}>
                    <SlidingWindowProvider options={{isActive: false}}>
                        <SnackbarProvider options={{isActive: false}}>
                            <App />
                        </SnackbarProvider>
                    </SlidingWindowProvider>
                </QueryClientProvider>
            </PopupProvider>
        </BrowserRouter>
    // </React.StrictMode>
);

const SendAnalytics = ()=> {
    ReactGA.send({
        hitType: "pageview",
        page: window.location.pathname,
    });
}

SendAnalytics()


