import React, { BaseSyntheticEvent } from 'react';


interface Props {
  rows: number,
  value?: string;
  onChange: (event: BaseSyntheticEvent) => void;
  onSubmitClick: ()=> void;
  btnDisable: boolean;
}

const InputBox: React.FunctionComponent<Props> = (props: Props) => {

    return (
      <div className="comment-wrapper">
        <div className="row">
          <div className="col-8 col-md-10">
            <textarea
              className="form-control"
              rows={props.rows}
              placeholder="Write comment"
              onChange={props.onChange}
              value= {props.value}
            ></textarea>
          </div>
          <div className="col-4 col-md-2 comment-btn-wrapper">
            <button
              className="btn btn-primary comment-btn"
              onClick={props.onSubmitClick}
              disabled={props.btnDisable}
              >Submit</button>
          </div>
        </div>
      </div>
    );

}

export default InputBox;
