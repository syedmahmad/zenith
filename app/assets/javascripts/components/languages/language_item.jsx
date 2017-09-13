var LanguageItem = React.createClass({

  getInitialState: function(){
    var language = this.props.language;
    return {name: language.name, level: language.level};
  },

   handleChange: function(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  },

  submitLanguage: function(e){
    e.preventDefault();
    this.props.updateResume(
      {language: {name: this.state.name, level: this.state.level}}
    );
  },

  render: function() {
    return (
      <div className="section-item">
        <form style={{marginTop: "30px"}} onSubmit={this.submitLanguage}>
          <div><input
            type="string"
            name="name"
            className="Language"
            placeholder="language name"
            value={this.state.name}
            onChange={ this.handleChange }
          /></div>
          <div><input
            type="string"
            name="level"
            className="name"
            placeholder="Beginner"
            value={this.state.level}
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