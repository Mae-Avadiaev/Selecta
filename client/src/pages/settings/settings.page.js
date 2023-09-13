import {Routes, Route} from "react-router-dom";
import React from "react";
import {LikesPoolSourcesPage} from "../likesPoolSources/likesPoolSources.page";
import {SyncedSourcesPage} from "../syncedSources/syncedSources.page";

export const SettingsPage = () => {
    return (
        <Routes>
            <Route path='/likes-pool-sources' element={
                <LikesPoolSourcesPage/>
            }/>
            <Route path='/synced-sources' element={
                <SyncedSourcesPage/>
            }/>
        </Routes>
    )
}