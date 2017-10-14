var AwardItem = React.createClass({

  getInitialState: function(){
    var award = this.props.award;
    return {name: award.name, description: award.description};
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
    showHideOptions = <ShowHideOptions handleShowHideChange={this.props.handleShowHideChange} model={this.props.award} section="awards" sectionId={this.props.award.id} options={optionsArr}/>
    return (
      <div className="">
        <li className="section-item" data-award-id={this.props.award.id} data-section-id={this.props.award.id}>
          <div id="edit_able" className="hide-section">  
             <a href="javaScript:void(0);">
             <i aria-hidden="true" className="fa fa-plus-circle" onMouseDown={this.props.addSubSection}></i>
             </a>
             <a href="javaScript:void(0);">
             <i aria-hidden="true" className="fa fa-trash" onMouseDown={this.props.removeSubSection} data-section-id={this.props.award.id}></i>
             </a>
             <a href="javaScript:void(0);" title="">
             <i aria-hidden="true" className="fa fa-cog" onMouseDown={this.handleShowHide}></i>
             </a>
          </div>
          {showHideOptions}
          { this.props.award.show_icon && 
            <div className="icon-holder pull-left">
               <i className="fa fa-trophy secondary-color" aria-hidden="true"></i>
            </div>
          }
          <h5>
            <div className="form-group" style={{marginLeft: "10px"}}>
              <input
                type="string"
                name="name"
                className="form-control hide-show-control"
                placeholder="Award Name"
                value={this.state.name}
                onChange={ this.handleChange }
              />
            </div>
          </h5>
          <h5>
            <div className="form-group" style={{marginLeft: "10px"}}>
              { this.props.award.show_description && <textArea
                type="string"
                name="description"
                className="form-control"
                placeholder="Award Description"
                value={this.state.description}
                onChange={ this.handleChange }
              />
              }
            </div>            
          </h5>
        </li>
      </div>
    )
  }
});