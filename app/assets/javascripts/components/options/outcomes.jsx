var Outcomes = React.createClass({
  getInitialState: function(){
    return {outcome: this.props.outcome};
  },
  handleChange: function(e){
    e.preventDefault();
    this.setState({outcome: e.target.value});
  },
  addOutcome: function(e){
    var enterKey = 13;
    if (e.which == enterKey){
      this.props.addNewOutcome(e);
    } else if(e.which == 8 && !$(e.target).val().trim()){
      index = $(e.target).data("index");
      this.props.removeOutcome(index);
    }
  },
  componentDidUpdate: function(){
    this.props.adjustTextFields();
  },
  componentDidMount: function(){
    this.props.adjustTextFields();
  },

  render: function() {
    outcome = this.state.outcome;
    return (
        <div className="column">
          <i className="fa fa-circle outcome-icon-6 secondary-color">
          </i>
           <span>
              <div className="form-group mb-0">
               <textArea data-index={this.props.index}
                 id="height-15"
                 type="string"
                 name="outcomes"
                 className="form-control line-height-26"
                 placeholder="Outcomes"
                 rows="1"
                 value={outcome.trim()} 
                 onKeyUp={ this.addOutcome }
                 onChange={ this.handleChange }
               />
              </div>
           </span>
        </div>
    )
  }
});