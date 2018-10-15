import React, {Component} from "react";
import {graphql} from "react-apollo";
import {Link} from 'react-router-dom';
import query from "../queries/fetchSongDetails";
import LyricCreate from "./LyricCreate";
import LyricList from "./LyricList";

class SongDetail extends Component{


    render(){
        if(this.props.data.loading){
            return (
                <div>
                    <Link to="/songs">Back</Link>
                    <h3>LOADING....</h3>
                </div>
            );
        }

        const {song} = this.props.data;
        return (
            <div>
                <Link to="/songs">Back</Link>
                <h3>{song.title}</h3>
                <LyricList lyrics={song.lyrics}/>
                <LyricCreate songId={this.props.match.params.id}/>
            </div>
        );
    }

}



export default graphql(query, {options: (props) => {return {variables: {id: props.match.params.id}}}})(SongDetail);


