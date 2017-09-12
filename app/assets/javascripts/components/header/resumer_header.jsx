var ResumeHeader = React.createClass({

  getInitialState: function(){
    var header = this.props.header;
    return {name: header.name, title: header.title, email: header.email, location: header.location};
  },

  handleNameChange: function(e){
    this.setState({name: e.target.value});
  },

  handleTitleChange: function(e){
    this.setState({title: e.target.value});
  },

  handleEmailChange: function(e){
    this.setState({email: e.target.value});
  },

  handleLocationChange: function(e){
    this.setState({location: e.target.value});
  },

  newHeaderSubmit: function(e){
    e.preventDefault();
    this.props.parentUpdateResume(
      {header: {name: this.state.name, title: this.state.title, email: this.state.email, location: this.state.location}}
    );
  },

  render: function() {
    return (
      <div className="col-md-12">
        <form style={{marginTop: "30px"}} onSubmit={this.newHeaderSubmit}>
          <div><input
            type="string"
            name="header[name]"
            className="name"
            placeholder="Full Name"
            value={this.state.name}
            onChange={ this.handleNameChange }
          /></div>

          <div><input
            type="string"
            name="header[title]"
            className="name"
            placeholder="Job Title"
            value={this.state.title}
            onChange={ this.handleTitleChange }
          /></div>
          <div><input
            type="string"
            name="header[email]"
            className="name"
            placeholder="guest_150523877422@example.com"
            value={this.state.email}
            onChange={ this.handleEmailChange }
          /></div>
          <div><input
            type="string"
            name="header[location]"
            className="name"
            placeholder="location"
            value={this.state.location}
            onChange={ this.handleLocationChange }
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