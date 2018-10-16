import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {Link} from "react-router-dom";
import query from "../queries/fetchSongs";
import gql from "graphql-tag";
import Navbar from "react-bootstrap/es/Navbar";


class SongList extends Component{
    onSongDelete(id){
        this.props.mutate({
            variables:{
                id: id
            }
        }).then(() => {this.props.data.refetch()});
    }

    renderSongs(){
        return this.props.data.songs.map(song => {
            return (
                <li key={song.id} className="collection-item">
                    <Link to={`/songs/${song.id}`}>{song.title}</Link>
                    <i className="material-icons" onClick={() => this.onSongDelete(song.id)}>delete</i>
                </li>
            );
        });
    }

    render(){
        if (this.props.data.loading){return <div>Loading....</div>;}
       return (
           <div>
               <ul className="collection">{this.renderSongs()}</ul>
               <Link to="/songs/new" className="btn-floating btn-normal red right">
                   <i className="material-icons">add</i>
               </Link>
               <a href="#">Auth0 - React</a>
           </div>
       );

    }
}


const mutation = gql `
   mutation DeleteSong($id: ID){
      deleteSong(id:$id){
            id
        }
    }
`;

export default graphql(mutation)(
    graphql(query)(SongList)
);