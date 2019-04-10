import React from 'react';

import './Post.css';

const post = (props) => (
    <div className="Post" onClick={props.clicked}>

        <h2>{props.nombre}</h2>
		<img src={props.imagen} alt="imagen" class="img-fluid" width="100"/>

    </div>
);

export default post;