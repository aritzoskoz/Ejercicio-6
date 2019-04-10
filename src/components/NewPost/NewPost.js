import React, { Component } from 'react';
//import axios from 'axios';
import axios from '../../axios';

import './NewPost.css';

class NewPost extends Component {
    state = {
        nombre: '',
        imagen: '',
        descripcion: '',
        precio: ''
    }

    postDataHandler = () => {
        const data = {
            nombre: this.state.nombre,
            imagen: this.state.imagen,
            descripcion: this.state.descripcion,
            precio: this.state.precio
        };
        axios.post('/posts.json', data)
            .then(response => {
                alert('Saved order');
                //console.log(response);
            }).catch(error => {
                // console.log(error);
                // this.setState({error: true});
                alert('Error order');
            });
    }

    render () {
        return (
            <div className="NewPost">
                <h1>Add a Post</h1>
                
                <label>Nombre</label>
                <input type="text" value={this.state.nombre} onChange={(event) => this.setState({nombre: event.target.value})} />
                
                <label>Descripción</label>
                <textarea rows="3" value={this.state.descripcion} onChange={(event) => this.setState({descripcion: event.target.value})} />
                
                <label>Precio</label>
                <input type="text" value={this.state.precio} onChange={(event) => this.setState({precio: event.target.value})} />
                
                <label>URL Imagen</label>
                <input type="text" value={this.state.imagen} onChange={(event) => this.setState({imagen: event.target.value})} />
                
                <button onClick={this.postDataHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;