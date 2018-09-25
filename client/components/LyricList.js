import React, {Component} from 'react';
import gql from "graphql-tag";
import {graphql} from "react-apollo";

class LyricList extends Component {
    onLike(id, content, likes){
        this.props.mutate({
            variables: {id: id},
            optimisticResponse: {
                __typename: 'Mutation',
                likeLyric: {
                    id: id,
                    __typename: 'LyricType',
                    likes: (likes + 1),
                    content: content
                }
            }
        });
    }
    renderLyrics(){
        return this.props.lyrics.map(lyric => {
           return (
               <li key={lyric.id} className="collection-item">
                   {lyric.content}
                   <div className="vote-box">
                       {lyric.likes}
                       <i className="material-icons"
                          onClick={() => this.onLike(lyric.id, lyric.content, lyric.likes)}
                       >thumb_up</i>
                   </div>
               </li>
           );
        });
    }

    render(){
        return (
            <ul className="collection">
                {this.renderLyrics()}
            </ul>
        );
    }
}

const mutation = gql `
    mutation LikeALyric($id:ID){
      likeLyric(id: $id){
        id
        likes
        content
      }
    }
`;

export default graphql(mutation)(LyricList);