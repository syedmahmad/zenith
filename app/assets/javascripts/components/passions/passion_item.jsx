var PassionItem = React.createClass({

  getInitialState: function(){
    var passion = this.props.passion;
    return {name: passion.name};
  },

   handleChange: function(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  },

  submitPassion: function(e){
    e.preventDefault();
    this.props.updateResume(
      {passion: {name: this.state.name}}
    );
  },

  render: function() {
    return (
      <div className="section-item">
        <form style={{marginTop: "30px"}} onSubmit={this.submitPassion}>
          <div><input
            type="string"
            name="name"
            className="name"
            placeholder="Your Passion"
            value={this.state.name}
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