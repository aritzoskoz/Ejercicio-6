import React, { Component } from 'react';
// import axios from 'axios';
import axios from '../../axios';

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null
    }

    componentDidUpdate() {
        if (this.props.id) {
            
            if (!this.state.loadedPost || this.state.loadedPost.idb !== this.props.id) {
                axios.get('/posts.json?orderBy="$key"&equalTo="' + this.props.id + '"')
                    
                    .then(response => {
                        const posts = [];
                        for (let key in response.data) {
                            posts.push({
                                ...response.data[key],
                                idb: key
                            });
                        }
                        
                        console.log(posts);
                        this.setState({ loadedPost: posts[0] });
                    });
            }
        }
    }



    deleteUpdatePostHandler = () => {
        axios.delete('/posts/' + this.props.id + '.json')
            .then(response => {
                console.log(response);
            });
    }

    render() {
        let post = <h1 style={{ textAlign:'center', color:'red'}}>Ei! Selecciona un Post!</h1>;

        if (this.props.id) {
            post = <h1 style={{ textAlign:'center', color:'red'}}>...Loading...Loading...Loading...</h1>;
        }
        
        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
            
                    <h1>{this.state.loadedPost.nombre}</h1>
		            <img src={this.state.loadedPost.imagen} alt="imagen" class="img-fluid" width="250"/>
                    <p>DESCRIPCIÓN: {this.state.loadedPost.descripcion}</p>
                    <p><em>PRECIO: {this.state.loadedPost.precio}</em></p>
                    
                    <div className="Edit">
                        <button onClick={this.deleteUpdatePostHandler} className="Delete">DELETE</button>
                    </div>
                </div>

            );
        }
        return post;
    }
}

export default FullPost;