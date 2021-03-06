var TechnologyItem = React.createClass({

  getInitialState: function(){
    var technology = this.props.technology;
    return {technology: technology, name: technology.name, tec_names: technology.tec_names};
  },

  handleChange: function(e){
    e.preventDefault();
    var resume = this.props.resume;
    var itemsObj = null;
    var subSectionId = $(e.target).closest(".section-item").data("sectionId");

    itemsObj = $.grep(resume["technologies"], function (item) {
      if(item.id == subSectionId){
        item[e.target.name] = e.target.value;
      }
      return item;
    });
    resume["technologies"] = itemsObj;
    this.props.resume = resume;
    this.setState({[e.target.name]: e.target.value});
  },

  handleShowHide: function(e){
    e.preventDefault();
    $(e.target).closest(".section-item").find(".show_hide_section").show()
  },

  render: function() {
    optionsArr = ["show_gouup_title"]
    showHideOptions = <ShowHideOptions handleShowHideChange={this.props.handleShowHideChange} model={this.state.technology} section="technologies" sectionId={this.state.technology.id} options={optionsArr}/>
    return (
       <li className="section-item row mrl0" data-technology-id={this.props.technology.id} data-section-id={this.props.technology.id}>
          <div id="edit_able" className="hide-section">  
             <a href="javaScript:void(0);">
             <i aria-hidden="true" className="fa fa-plus-circle" onMouseDown={this.props.addSubSection}></i>
             </a>
             <a href="javaScript:void(0);">
             <i aria-hidden="true" className="fa fa-trash" onMouseDown={this.props.removeSubSection} data-section-id={this.props.technology.id}></i>
             </a>
             <a href="javaScript:void(0);" title="">
             <i aria-hidden="true" className="fa fa-cog" onMouseDown={this.handleShowHide}></i>
             </a>
          </div>
          {showHideOptions}
          <div className="input-holder">
           {this.state.technology.show_gouup_title && <div className="form-group mb-0">
              <textArea
                type="string"
                name="name"
                className="form-control secondary-color sub-header"
                placeholder="Group Title"
                value={this.state.name}
                onChange={ this.handleChange }
              />
           </div>}
           <div className="form-group mb-0">
              <textArea
                type="string"
                name="tec_names"
                className="form-control hide-show-control"
                placeholder="Tech"
                value={this.state.tec_names}
                onChange={ this.handleChange }
              />
           </div>
          </div>
          { this.props.total > 1 &&
            <div className="sub-section-rearrange"><i className="fa fa-arrows"></i></div>
          }
       </li>
    )
  }
});