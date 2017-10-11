var PassionItem = React.createClass({

  getInitialState: function(){
    var passion = this.props.passion;
    return {passion: passion, name: passion.name, description: passion.description};
  },

  handleChange: function(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  },

  handleShowHide: function(e){
    e.preventDefault();
    $(e.target).closest(".section-item").find(".show_hide_section").show()
  },

  render: function() {
    optionsArr = ["show_icon", "show_description"]
    showHideOptions = <ShowHideOptions handleShowHideChange={this.props.handleShowHideChange} model={this.state.passion} section="passions" sectionId={this.state.passion.id} options={optionsArr}/>
    return (
      <div className="">
         <li className="section-item" data-passion-id={this.props.passion.id} data-section-id={this.props.passion.id}>
            <div id="edit_able" className="hide-section">  
               <a href="javaScript:void(0);">
               <i aria-hidden="true" className="fa fa-plus-circle" onMouseDown={this.props.addSubSection}></i>
               </a>
               <a href="javaScript:void(0);">
               <i aria-hidden="true" className="fa fa-trash" onMouseDown={this.props.removeSubSection} data-section-id={this.props.passion.id}></i>
               </a>
               <a href="javaScript:void(0);" title="">
               <i aria-hidden="true" className="fa fa-cog" onMouseDown={this.handleShowHide}></i>
               </a>
            </div>
            {showHideOptions}
            { this.state.passion.show_icon && <div className="icon-holder pull-left">
               <i className="fa fa-heart secondary-color" aria-hidden="true"></i>
            </div>}
            <h5>
               <div className="form-group">
                  <input
                    type="string"
                    name="name"
                    className="form-control hide-show-control"
                    placeholder="Your Passion"
                    value={this.state.name}
                    onChange={ this.handleChange }
                  />
               </div>
            </h5>
            <h5>
               { this.state.passion.show_description && <div className="form-group">
                  <input
                    type="string"
                    name="description"
                    className="form-control"
                    placeholder="description"
                    value={this.state.description}
                    onChange={ this.handleChange }
                  />
               </div>}
            </h5>
         </li>
      </div>
    )
  }
});