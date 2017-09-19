var AwardItem = React.createClass({

  getInitialState: function(){
    var award = this.props.award;
    return {name: award.name};
  },

   handleChange: function(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  },

  submitAward: function(e){
    e.preventDefault();
    this.props.updateResume(
      {award: {name: this.state.name}}
    );
  },

  render: function() {
    return (
      <div className="heading-area">
        <i className="fa fa-bolt" aria-hidden="true"></i>
        <div className="form-group">
          <input
            type="string"
            name="name"
            className="form-control"
            placeholder="Award Name"
            value={this.state.name}
            onChange={ this.handleChange }
          />
        </div>          
      </div>
    )
  }
});