var StrengthItem = React.createClass({

  getInitialState: function(){
    var strength = this.props.strength;
    return {title: strength.title, description: strength.description};
  },

   handleChange: function(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  },

  render: function() {
    return (
     <div className="">
        <li className="section-item" data-strength-id={this.props.strength.id}>
           <div id="edit_able" className="hide-section">  
              <a href="javaScript:void(0);">
              <i aria-hidden="true" className="fa fa-plus-circle" onMouseDown={this.props.addSubSection}></i>
              </a>
              <a href="javaScript:void(0);">
              <i aria-hidden="true" className="fa fa-trash" onMouseDown={this.props.removeSubSection} data-section-id={this.props.strength.id}></i>
              </a>
           </div>
           <div className="icon-holder pull-left">
              <i className="fa fa-gavel" aria-hidden="true"></i>
           </div>
           <h5>
              <div className="form-group">
                 <input
                   type="string"
                   name="title"
                   className="form-control"
                   placeholder="Your Unique Talent"
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
                   placeholder="As result of it / how did you acquire it"
                   value={this.state.description}
                   onChange={ this.handleChange }
                 />
              </div>
           </h6>
        </li>
     </div>
    )
  }
});