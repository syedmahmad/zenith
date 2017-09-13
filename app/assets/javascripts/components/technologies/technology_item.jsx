var TechnologyItem = React.createClass({

  getInitialState: function(){
    var technology = this.props.technology;
    return {name: technology.name, tec_names: technology.tec_names};
  },

   handleChange: function(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  },

  submitTechnology: function(e){
    e.preventDefault();
    this.props.updateResume(
      {technology: {name: this.state.name, tec_names: this.state.tec_names}}
    );
  },

  render: function() {
    return (
      <div className="section-item">
        <form style={{marginTop: "30px"}} onSubmit={this.submitTechnology}>
          <div><input
            type="string"
            name="name"
            className="technology"
            placeholder="Group Title"
            value={this.state.name}
            onChange={ this.handleChange }
          /></div>
          <div><input
            type="string"
            name="tec_names"
            className="name"
            placeholder="Tech"
            value={this.state.tec_names}
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