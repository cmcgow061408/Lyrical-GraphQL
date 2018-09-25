import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {hashHistory, Link} from "react-router";
import query from "../queries/fetchSongs";
import gql from "graphql-tag";


class SongList extends Component{
    onSongDelete(id){
        this.props.mutate({
            variables:{
                id: id
            }
        }).then(() => {this.props.data.refetch()});
    }

    rendorSongs(){
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
               <ul className="collection">{this.rendorSongs()}</ul>
               <Link to="/songs/new" className="btn-floating btn-normal red right">
                   <i className="material-icons">add</i>
               </Link>
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