var Summary = React.createClass({

  getInitialState: function(){
    var summary = this.props.resume["summary"];
    return {title: summary.title, description: summary.description};
  },

  handleChange: function(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  },

  submitSummaryData: function(e){
    e.preventDefault();
    this.props.updateResume(
      {summary: {title: this.state.title, description: this.state.description}}
    );
  },

  render: function() {
    return (
      <div className="col-md-12">
        <form style={{marginTop: "30px"}} onSubmit={this.submitSummaryData}>

          <div><input
            type="string"
            name="title"
            className="name"
            placeholder="SUMMARY"
            value={this.state.title}
            onChange={ this.handleChange}
          /></div>

          <div><input
            type="string"
            name="description"
            className="name"
            placeholder="What critical problems are you well positioned to solve? A bit about yourself"
            value={this.state.description}
            onChange={ this.handleChange}
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