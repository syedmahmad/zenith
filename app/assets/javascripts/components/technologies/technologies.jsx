var Technologies = React.createClass({
  getInitialState: function(){
    return {technology_header: "TECHNOLOGIES", technologies: this.props.resume.technologies};
  },
  handleChange: function(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  },
  handleRemoveSection: function(e){
    e.preventDefault();
    this.props.handleRemoveSection(e);
  },
  componentDidMount: function(){
    var _this = this;
    $(document).on('focusin', ".section-item", (function (e) {
      this.previousElementSibling.classList.remove('hide-section');
    }));
    $(document).on('focusout', ".section-item", (function (e) {
      this.previousElementSibling.classList.add('hide-section');
      // if(_this.props.achievement[e.target.name] != e.target.value){
      _this.submitTechnologies({[e.target.name]: e.target.value, id: $(this).data("technologyId")});
        // _this.props.achievement[e.target.name] = e.target.value;
      // }
    }));

   // show and hide buttons
    $(document).on('focusin', ".heading-area", (function (e) {
      this.parentElement.previousElementSibling.classList.remove('hide-section');
    })); 
    $(document).on('focusout', ".heading-area", (function (e) {
      this.parentElement.previousElementSibling.classList.add('hide-section');
    }));

  },
  submitTechnologies: function(params){
    this.props.updateResume(
      {resume: {technologies_attributes: {"1": params}}}
    );
  },    
  addSubSection: function(e){
    e.preventDefault();
    var id=1;
    if (this.state.technologies.length>0) {
      id = this.state.technologies[this.state.technologies.length-1].id + 1;
    }
    var technology = {id:id, name:'', tec_names:''};
    this.state.technologies.push(technology);
    this.setState({technologies: this.state.technologies});
  },
  removeSubSection: function(e){
    e.preventDefault();
    var obj_to_remove = this.state.technologies.find(item => item.id === $(e.target).data("sectionId"));
    if (obj_to_remove) {
      this.setState({technologies: this.state.technologies.filter(item => item.id !== obj_to_remove.id)});    
    }
  },
  render: function() {
    var technologies = this.props.resume.technologies;
    var data = [];
    var key = "";
    var _this = this;
    technologies.forEach(function(technology) {
      key = "technology-" + technology.id;
      data.push(<TechnologyItem technology={technology} key={key}  removeSubSection={_this.removeSubSection} addSubSection={_this.addSubSection} updateResume={_this.props.updateResume}/>);
    });
    
    return (
     <div className="section-items col-md-12" data-section-name="technology">
       <div id="edit_able" className="hide-section">  
          <a href="javaScript:void(0);">
          <i aria-hidden="true" className="fa fa-plus-circle" onMouseDown={this.addSubSection}></i>
          </a>
          <a href="javaScript:void(0);">
          <i aria-hidden="true" className="fa fa-trash" onMouseDown={this.handleRemoveSection} data-section-name="technologies"></i>
          </a>
       </div>
        <section className="achievement-holder">
           <div className="heading-area">
              <h3>
                 <div className="form-group">
                    <input
                      type="string"
                      name="technology_header"
                      className="form-control"
                      placeholder="TECHNOLOGIES"
                      value={this.state.technology_header}
                      onChange={ this.handleChange }
                    />
                 </div>
              </h3>
           </div>
           <div className="achievement-list">
              <ul>
                {data}
              </ul>
           </div>
        </section>
      </div>
    )
  }
});