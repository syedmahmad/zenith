var CvBuilder = React.createClass({
  getInitialState: function() {
    return {pages: 1, sectionData: [{name: "Summary", page: 0}], layoutSections: this.props.resume.layout.section_names, resume_ids: this.props.resume_ids, resume: this.props.resume};
  },
  removeArrayItem: function(arr, itemToRemove) {
    return arr.filter(item => item !== itemToRemove)
  },
  componentDidUpdate: function(prevProps, prevState){
    elements = $(".page")
    _this = this;
    $.each(elements, function( index, elem ) {
      if(elem.scrollHeight > elem.offsetHeight){
        var lastElm = _this.state.layoutSections[_this.state.layoutSections.length - 1];
        pages = _this.state.pages;
        if(index+1 == pages){
          pages = pages + 1;
        }
        sectionData = array = $.grep(_this.state.sectionData, function (a) {
                        if (a.name == lastElm) {
                            a.page = index + 1;
                        }
                        return a;
                    });
        // sectionData.push({name: lastElm, page: index + 1});
        _this.setState({pages: pages, sectionData: sectionData});
      }else{
        if($(elem).find(".section-item").length == 0){
          elem.remove();
          _this.setState({pages: _this.state.pages - 1});
        }
      }
    });
  },
  updateResume: function(formData){
    var _this = this;
    $.ajax({
      url: ("http://localhost:3000/resumes/"+_this.state.resume.id),
      dataType: 'json',
      type: 'PATCH',
      contentType: 'multipart/form-data',
      data: formData,
      success: function(projects) {
        // this.setState({projects: projects, showNewForm: false});
        // onSuccess();
      }.bind(this),
      error: function(response, status, err) {
        // onError(response.responseJSON)
      }
    });
  },
  createSubSection: function(formData,sectionName){
    var _this = this;
    $.ajax({
      url: ("http://localhost:3000/resumes/"+_this.props.resume.id+"/create_sub_record"),
      dataType: 'json',
      type: 'POST',
      contentType: 'multipart/form-data',
      data: formData,
      success: function(item) {
        this.state.resume[sectionName].push(item);
        this.setState({resume: this.state.resume});
      }.bind(this),
      error: function(response, status, err) {
      }
    });
  },
  removeSubSection: function(formData,sectionName){
    var _this = this;
    $.ajax({
      url: ("http://localhost:3000/resumes/"+formData.section_id+"/delete_sub_record"),
      type: 'DELETE',
      contentType: 'multipart/form-data',
      data: formData,
      success: function(item) {
        this.state.resume[sectionName].splice(item, 1);
        this.setState({resume: this.state.resume});
      }.bind(this),
      error: function(response, status, err) {
      }
    });
  },
  handleRearrage: function(){
    var section_names = $('.rearrange-section-item').map(function() {
      return $(this).data('sectionName');
    }).get();

    params = {id: this.props.resume.layout.id, "section_names": section_names};
    if (this.props.current_user) {
      this.updateResume({resume: {layout_attributes: params}});
    }

    this.setState({layoutSections: section_names});
  },
  handleAddSection: function(e){
    var newSection = $(e.target).data("sectionName");
    this.state.layoutSections.push(newSection);
    if (this.props.current_user) {
      params = {id: this.props.resume.layout.id, "section_names": this.state.layoutSections};
      this.updateResume({resume: {layout_attributes: params}});
    }
    this.setState({layoutSections: this.state.layoutSections});
    // this.state.sectionData.push({name: newSection, page: 0});
    this.setState({layoutSections: this.state.layoutSections, sectionData: this.state.sectionData});
  },
  handleRemoveSection: function(e){
    var removeSection = $(e.target).data("sectionName");
    var positionInSections = this.state.layoutSections.indexOf(removeSection);
    this.state.layoutSections.splice(positionInSections, 1);
    if (this.props.current_user) {
      params = {id: this.props.resume.layout.id, "section_names": this.state.layoutSections};
      this.updateResume({resume: {layout_attributes: params}});
    }
    this.setState({layoutSections: this.state.layoutSections});
  },

  render: function() {
    var data = [];
    var data_1 = [];
    var selectedSections = [];
    var MyComponent = null;
    var state = this.state;
    var key = "";
    var header = this.state.resume["header"];
    var _this = this;

    for(i=0;i<_this.state.pages;i++){
      data = [];
      selectedSections = [];
      $.grep(_this.state.sectionData, function(item){
        if(item.page == i){
          selectedSections.push(item.name);
        }
      });

      _this.state.layoutSections.forEach(function(section) {
        if($.inArray(section, selectedSections) > -1){
          section = section.substr(0,1).toUpperCase()+section.substr(1);
          MyComponent = window[section];
          key = section + "holder"+i;
          data.push(<MyComponent handleRemoveSection={_this.handleRemoveSection} resume={state.resume} key={key} updateResume={_this.updateResume} createSubSection={_this.createSubSection}  removeSubSection={_this.removeSubSection}/>);
        }
      });
      key = "page-"+i;  
      data_1.push(<Page key={key} page_index={i+1} header={header} updateResume={_this.updateResume} page_data={data} createSubSection={_this.createSubSection} removeSubSection={_this.removeSubSection}/>);
    };
    debugger;
    return (
      <div className="cv-builder-container">
        <div className="right_col" role="main">
          <div className="clearfix"></div>
          <div className="row">
            {data_1}  
          </div>
        </div>
        <RearrangeModal pages={this.state.pages} sectionData={this.state.sectionData} handleRearrage={this.handleRearrage} sections={this.state.layoutSections}/>
        <AddSectionModal handleAddSection={this.handleAddSection} sections={this.state.layoutSections}/>
      </div>
    )
  }
});