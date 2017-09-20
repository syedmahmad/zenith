var LanguageItem = React.createClass({

  getInitialState: function(){
    var language = this.props.language;
    return {name: language.name, level: language.level};
  },

   handleChange: function(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  },

  render: function() {
    return (
      <div className="">
        <div id="edit_able" className="hide-section">  
           <a href="javaScript:void(0);">
           <i aria-hidden="true" className="fa fa-plus-circle" onMouseDown={this.props.addSubSection}></i>
           </a>
           <a href="javaScript:void(0);">
           <i aria-hidden="true" className="fa fa-trash" onMouseDown={this.props.removeSubSection} data-section-id={this.props.language.id}></i>
           </a>
        </div>
         <li className="section-item" data-language-id={this.props.language.id}>
            <div className="icon-holder pull-left">
               <i className="fa fa-bolt" aria-hidden="true"></i>
            </div>
            <h5>
               <div className="form-group">
                  <input
                    type="string"
                    name="name"
                    className="form-control"
                    placeholder="language name"
                    value={this.state.name}
                    onChange={ this.handleChange }
                  />
               </div>
            </h5>
            <h6>
               <div className="form-group">
                  <input
                    type="string"
                    name="level"
                    className="form-control"
                    placeholder="Beginner"
                    value={this.state.level}
                    onChange={ this.handleChange }
                  />
               </div>
            </h6>
         </li>
      </div>
    )
  }
});