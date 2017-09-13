var StrengthItem = React.createClass({

  getInitialState: function(){
    var strength = this.props.strength;
    return {title: strength.title, description: strength.description};
  },

   handleChange: function(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  },

  submitStrength: function(e){
    e.preventDefault();
    this.props.updateResume(
      {strength: {title: this.state.title, description: this.state.description}}
    );
  },

  render: function() {
    return (
      <div className="section-item">
        <form style={{marginTop: "30px"}} onSubmit={this.submitStrength}>
          <div><input
            type="string"
            name="title"
            className="name"
            placeholder="Your Unique Talent"
            value={this.state.title}
            onChange={ this.handleChange }
          /></div>

          <div><input
            type="string"
            name="description"
            className="name"
            placeholder="As result of it / how did you acquire it"
            value={this.state.description}
            onChange={ this.handleChange }
          /></div>
          
          <div className='row'>
            <div className='col-sm-4'>
              <input hidden type="submit" value="Save" className='btn btn-primary' />
            </div>
          </div>
        </form>
      </div>
    )
  }
});