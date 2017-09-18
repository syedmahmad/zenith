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
       <li className="section-item">
          <div className="icon-holder pull-left">
             <i className="fa fa-bolt" aria-hidden="true"></i>
          </div>
          <h5>
             <div className="form-group">
                <input
                  type="string"
                  name="title"
                  className="form-control"
                  placeholder="What are you most proud of?"
                  value={this.state.title}
                  onChange={ this.handleChange }
                />
             </div>
          </h5>
          <h6>
             <div className="form-group">
                <input
                  type="string"
                  name="description"
                  className="form-control"
                  placeholder="A bit about your achievement"
                  value={this.state.description}
                  onChange={ this.handleChange }
                />
             </div>
          </h6>
       </li>
    )
  }
});