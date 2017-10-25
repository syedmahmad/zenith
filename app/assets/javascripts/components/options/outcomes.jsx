var Outcomes = React.createClass({
  getInitialState: function(){
    var outcome = this.props.outcome;
    return {outcomes: outcome.data};
  },
  handleChange: function(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  },
  addOutcome: function(e){
    var enterKey = 13;
    if (e.which == enterKey){
      this.props.addNewOutcome(e);
    } else {
      // var params = {[e.target.name]: outcomes, "id": $(e.target).closest(".section-item").data("experienceId")}
      // this.props.updateResume(
      //   {resume: {experiences_attributes: params}}
      // );
    }
    if (e.target.value == "") {

    }



  },

  render: function() {
    outcomes = this.state.outcomes;
    return (
        <div className="column">
          <i className="fa fa-circle">
          </i>
           <span>
              <div className="form-group mb-0"  data-id={this.props.outcome.id}>
               <textArea
                 type="string"
                 name="outcomes"
                 className="form-control abc height-15"
                 placeholder="What was an example of a successful outcome of this activity? (e.g. Made 30+ partnerships)"
                 rows="1"
                 value={outcomes || ''} 
                 onKeyUp={ this.addOutcome }
                 onChange={ this.handleChange }
               />
              </div>
           </span>
        </div>
    )
  }
});