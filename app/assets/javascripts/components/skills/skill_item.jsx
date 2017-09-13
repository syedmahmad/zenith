var SkillItem = React.createClass({

  getInitialState: function(){
    var skill = this.props.skill;
    return {name: skill.name, level: skill.level};
  },

   handleChange: function(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  },

  submitSkill: function(e){
    e.preventDefault();
    this.props.updateResume(
      {skill: {name: this.state.name, level: this.state.level}}
    );
  },

  render: function() {
    return (
      <div className="section-item">
        <form style={{marginTop: "30px"}} onSubmit={this.submitSkill}>
          <div><input
            type="string"
            name="name"
            className="name"
            placeholder="Skill"
            value={this.state.name}
            onChange={ this.handleChange }
          /></div>
          <div><input
            type="string"
            name="level"
            className="name"
            placeholder="Introductory"
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