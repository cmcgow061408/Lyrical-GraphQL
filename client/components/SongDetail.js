import React, {Component} from "react";
import {graphql} from "react-apollo";
import {Link} from 'react-router';
import query from "../queries/fetchSongDetails";
import LyricCreate from "./LyricCreate";
import LyricList from "./LyricList";

class SongDetail extends Component{


    render(){
        if(this.props.data.loading){
            return (
                <div>
                    <Link to="/">Back</Link>
                    <h3>LOADING....</h3>
                </div>
            );
        }

        const {song} = this.props.data;
        console.log(song);
        return (
            <div>
                <Link to="/">Back</Link>
                <h3>{song.title}</h3>
                <LyricList/>
                <LyricCreate songId={this.props.params.id}/>
            </div>
        );
    }

}



export default graphql(query, {options: (props) => {return {variables: {id: props.params.id}}}})(SongDetail);


