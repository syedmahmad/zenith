var AchievementItem = React.createClass({

  getInitialState: function(){
    var achievement = this.props.achievement;
    return {title: achievement.title, description: achievement.description};
  },

  handleTitleChange: function(e){
    this.setState({title: e.target.value});
  },

  handleDescriptionChange: function(e){
    this.setState({email: e.target.value});
  },

  handleAchievementSubmit: function(e){
    e.preventDefault();
    this.props.parentUpdateResume(
      {achievement: {title: this.state.title, description: this.state.description}}
    );
  },

  render: function() {
    return (
      <div className="section-item">
        <form style={{marginTop: "30px"}} onSubmit={this.handleAchievementSubmit}>
          <div><input
            type="string"
            name="achievement[title]"
            className="name"
            placeholder="Job Title"
            value={this.state.title}
            onChange={ this.handleTitleChange }
          /></div>
          <div><input
            type="string"
            name="achievement[description]"
            className="name"
            placeholder="A bit about your achievements"
            value={this.state.description}
            onChange={ this.handleDescriptionChange }
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