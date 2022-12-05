import React, { useState } from "react";

export default (props) => {
    const [nome, alteraNome] = useState('')
    return (
        <>
            <input type="text" value={nome} onChange={e => alteraNome(e.target.value)}/>
        </>
    );
};