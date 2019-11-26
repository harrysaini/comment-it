import React from 'react';
import {map} from 'lodash';
import SingleComment from './SingleComment';
import { reverseMap } from '../../../utils/reverseMap';

interface Props {
  replies: any[];
}

const Replies: React.FunctionComponent<Props> = (props: Props) => {

  const replies = props.replies;

  const repliesJSX = reverseMap(replies, (reply, index) => {
    return <SingleComment comment={reply} key={index}/>
  })

  return (
    <div className="replies col-offset-1">
      {repliesJSX}
    </div>
  );

}

export default Replies;
