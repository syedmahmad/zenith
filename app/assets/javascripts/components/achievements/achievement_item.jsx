var AchievementItem = React.createClass({
  getInitialState: function(){
    var achievement = this.props.achievement;
    return {title: achievement.title, description: achievement.description};
  },
  componentDidMount: function(){
    var _this = this;
    $(".section-items").on('focusout', (function (e) {
      _this.submitAchievment({[e.target.name]: e.target.value});
    }));
  },
  handleChange: function(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  },
  submitAchievment: function(params){
    this.props.updateResume(
      {resume: {achievements_attributes: params}}
    );
  },

  render: function() {
    return (
      <div className="section-item">
        <form style={{marginTop: "30px"}}>
          <div><input
            type="string"
            name="title"
            className="name"
            placeholder="What are you most proud of?"
            value={this.state.title}
            onChange={ this.handleChange }
          /></div>
          <div><input
            type="string"
            name="description"
            className="name"
            placeholder="A bit about your achievement"
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