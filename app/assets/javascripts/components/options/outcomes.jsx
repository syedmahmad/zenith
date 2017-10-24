var Outcomes = React.createClass({
  getInitialState: function(){
    var outcome = this.props.outcome;
    return {outcomes: outcome};
  },
  handleChange: function(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  },

  render: function() {
    outcomes = this.state.outcomes;

    return (
        <div className="column">
          <i className="fa fa-dot-circle-o">
          </i>
           <span>
              <div className="form-group mb-0">
               <textArea
                 type="string"
                 name="outcomes"
                 className="form-control abc height-15"
                 placeholder="What was an example of a successful outcome of this activity? (e.g. Made 30+ partnerships)"
                 rows="1"
                 value={outcomes || ''} 
                 onChange={ this.handleChange }
               />
              </div>
           </span>
        </div>
    )
  }
});