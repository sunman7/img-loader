import React from "react";
import {observer} from "mobx-react";
import {useStore} from "../stores";

const Component = observer(() => {
    const {AuthStore} = useStore();
    return (
        <>
            <h1>login:{AuthStore.values.username}</h1>
        </>
    );
});


export default Component;