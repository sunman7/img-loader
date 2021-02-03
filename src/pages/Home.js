import React from "react";
import {observer} from "mobx-react";
import {useStore} from "../stores";
import Uploader from "../components/Uploader";

const Home = observer(() => {
    const {UserStore} = useStore();
    return (
        <>
            <h1>Hi,{UserStore.currentUser ? UserStore.currentUser.attributes.username : "陌生人"}</h1>
            <Uploader/>
        </>
    );
});

export default Home;