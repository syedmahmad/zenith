var AwardItem = React.createClass({

  getInitialState: function(){
    var award = this.props.award;
    return {name: award.name};
  },

  handleChange: function(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  },

  render: function() {
    return (
      <div className="">
        <div className="section-item" data-award-id={this.props.award.id}>
          <div id="edit_able" className="hide-section">  
             <a href="javaScript:void(0);">
             <i aria-hidden="true" className="fa fa-plus-circle" onMouseDown={this.props.addSubSection}></i>
             </a>
             <a href="javaScript:void(0);">
             <i aria-hidden="true" className="fa fa-trash" onMouseDown={this.props.removeSubSection} data-section-id={this.props.award.id}></i>
             </a>
          </div>
          <div className="icon-holder pull-left">
             <i className="fa fa-bolt" aria-hidden="true"></i>
          </div>
          <div className="form-group">
            <input
              type="string"
              name="name"
              className="form-control"
              placeholder="Award Name"
              value={this.state.name}
              onChange={ this.handleChange }
            />
          </div>          
        </div>
      </div>
    )
  }
});