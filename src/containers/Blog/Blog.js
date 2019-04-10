import React, { Component } from 'react';

import axios from '../../axios';

import './Blog.css';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';


class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false
    }

    //Método que se ejecuta justo después de que el componente haya sido montado en el DOM
    //Por ello es perfecto para integrar librerias de terceros (plugins jquery), peticiones ajax
    //o establecer algún timer de tipo setTimeout ó setInterval...
    componentDidMount () {
        axios.get( '/posts.json' )
            .then( response => {
                
                let posts = [];
                for (let key in response.data) {
                    posts.push({
                        ...response.data[key],
                        idb: key
                    });
                }

                this.setState({posts: posts});
            } )
            .catch(error => {
                this.setState({error: true});
            });
    }


    //Método cuando se ha seleccionado un post
    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id});
    }


    render () {
        //Lo veremos si ha habido un error
        let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>;

        //Si no ha habido error:
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return <Post 
                    key={post.idb} 
                    nombre={post.nombre} 
                    imagen={post.imagen}
                    descripcion={post.descripcion}
                    precio={post.precio}
                    clicked={() => this.postSelectedHandler(post.idb)} />;
            });
        }

        return (
            <div>
                <div><h1> SECCIÓN 1 - POSTS </h1></div>
                <section className="Posts">
                    {posts}
                </section>

                <div><h1> SECCIÓN 2 - FULLPOST </h1></div>
                <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>

                <div><h1> SECCIÓN 3 - ADD A POST </h1></div>
                <section>
                    <NewPost/>
                </section>
            </div>
        );
    }
}

export default Blog;