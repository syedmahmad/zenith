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
      <div className="section-item">
        <form style={{marginTop: "30px"}} onSubmit={this.submitAward}>
          <div><input
            type="string"
            name="name"
            className="name"
            placeholder="Award Name"
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