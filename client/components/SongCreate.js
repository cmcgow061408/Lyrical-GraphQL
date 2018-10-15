import React, {Component} from "react";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import {Link} from 'react-router-dom';
import query from "../queries/fetchSongs";
import createHashHistory from 'history/createHashHistory';

const history = createHashHistory();

class SongCreate extends Component{

    constructor(props){
        super(props);
        this.state = {title:''};
    }

    onSubmit(event){
        event.preventDefault();
        this.props.mutate({
            variables:{
                title: this.state.title
            },
            refetchQueries:[{query:query}]
        }).then(() => {history.push("/songs");});
    }

    render(){
        return (
        <div>
            <Link to="/songs">Back</Link>
            <h3>Create a new song</h3>
            <form onSubmit={this.onSubmit.bind(this)}>
                <label>Song Title:</label>
                <input onChange={event => this.setState({title: event.target.value})}
                    value={this.state.title}
                    />
            </form>
        </div>);
    }
}

const mutation = gql `
   mutation AddSong($title:String){
      addSong(title:$title){
        id
        title
        }
    }
`;

export default graphql(mutation)(SongCreate);