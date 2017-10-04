var CvBuilder = React.createClass({
  getInitialState: function() {
    return {layout_type: this.props.resume.layout.layout_type, pages: 1, sectionData: this.props.resume.layout.section_data, layoutSections: this.props.resume.layout.section_names, resume_ids: this.props.resume_ids, resume: this.props.resume, resumeStyle: this.props.resume.resume_style};
  },
  removeArrayItem: function(arr, itemToRemove) {
    return arr.filter(item => item !== itemToRemove)
  },
  componentDidUpdate: function(prevProps, prevState){
    this.setupLayout();    
  },
  componentDidMount: function(){
    this.setupLayout();
    this.updateColor();
  },
  componentDidUpdate: function(){
    this.updateColor();
  },
  updateColor: function(){
    var _this = this;
    $(".cv-builder :input:not(.secondary-color)").each(function(e,val){ 
      $(val).css('color', _this.state.resumeStyle.primary_color)
    });
  },
  setupLayout: function(){
    elements = $(".page")
    _this = this;
    $.each(elements, function( index, elem ) {
      if(elem.scrollHeight > elem.offsetHeight){
        var lastElm = $(elem).find(".section-items").last().data("sectionName");
        pages = _this.state.pages;
        if(index+1 == pages){
          pages = pages + 1;
        }
        sectionData = $.grep(_this.state.sectionData, function (a) {
                        if (a.name == lastElm) {
                            a.page = index + 1;
                        }
                        return a;
                    });
        // sectionData.push({name: lastElm, page: index + 1});
        _this.setState({pages: pages, sectionData: sectionData});
      }else{
        if($(elem).find(".section-items").length == 0){
          elem.remove();
          _this.setState({pages: _this.state.pages - 1});
        }
      }
    });
  },
  updateResume: function(formData){
    var _this = this;
    $.ajax({
      url: (this.props.host+"resumes/"+_this.state.resume.id),
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
      url: (this.props.host+"resumes/"+_this.props.resume.id+"/create_sub_record"),
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
      url: (this.props.host+"resumes/"+formData.section_id+"/delete_sub_record"),
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
    sectionData = this.state.sectionData
    var section_names = $('.rearrange-section-item').map(function(index, elem) {
      sectionData = $.grep(sectionData, function (a) {
        if (a.name == $(elem).data('sectionName')) {
            a.page = $(elem).closest(".reorder-page").data('page');
            if($(elem).parents(".rearrange-resume-col-right").length > 0){
              a.column = 1
            }else if($(elem).parents(".rearrange-resume-col-left").length > 0){
              a.column = 0
            }
        }
        return a;
      });
      return $(elem).data('sectionName');
    }).get();

    params = {id: this.props.resume.layout.id, "section_names": section_names, "section_data": sectionData, "pages": pages};
    if (this.props.current_user) {
      this.updateResume({resume: {layout_attributes: params}});
    }
    if(this.state.layout_type == "single"){
      $(".rearrange-section-modal").sortable("cancel");
    }else if(this.state.layout_type == "double"){
      $(".rearrange-resume-col-left, .rearrange-resume-col-right").sortable("cancel");
    }

    this.setState({layoutSections: section_names, sectionData: sectionData, pages: pages});
  },
  handleAddSection: function(e){
    var newSection = $(e.target).data("sectionName");
    sections = this.state.layoutSections
    sectionData = this.state.sectionData
    sections.push(newSection);
    sectionData.push({name: newSection, page: 0, column: 0});
    if (this.props.current_user) {
      params = {id: this.props.resume.layout.id, "section_names": sections, "section_data": sectionData};
      this.updateResume({resume: {layout_attributes: params}});
    }
    this.setState({layoutSections: sections, sectionData: sectionData});
  },
  handleBackground: function(e) {
    var img = $(e.target).data("imageName");
    params = {id: this.props.resume.resume_style.id, "background_img": img};
    this.updateResume({resume: {resume_style_attributes: params}});

    this.state.resumeStyle.background_img = img;
    this.setState({resumeStyle: this.state.resumeStyle});
  },
  handleFont: function(e) {
    var font = $(e.target).data("fontName");
    params = {id: this.props.resume.resume_style.id, "font_family": font};
    this.updateResume({resume: {resume_style_attributes: params}});

    this.state.resumeStyle.font_family = font;
    this.setState({resumeStyle: this.state.resumeStyle});
  },
  handleColor: function(e) {
    var pri_color = $(e.target.closest(".color-holder")).data("priColorName");
    var sec_color = $(e.target.closest(".color-holder")).data("secColorName");

    params = {id: this.props.resume.resume_style.id, "primary_color": pri_color, "secondary_color": sec_color};
    this.updateResume({resume: {resume_style_attributes: params}});

    this.state.resumeStyle.primary_color = pri_color;
    this.state.resumeStyle.secondary_color = sec_color;
    this.setState({resumeStyle: this.state.resumeStyle});
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
  handleLayoutChange: function(e){
    selectedLayout = $(e.currentTarget).data("layoutType")
    if(selectedLayout != this.state.layout_type){
      if (this.props.current_user) {
        params = {id: this.props.resume.layout.id, "layout_type": selectedLayout};
        this.updateResume({resume: {layout_attributes: params}});
      }
      this.setState({layout_type: selectedLayout});
    }
  },

  removeChild: function(){
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
    data_right = []
    data_left = []

    for(i=0;i<_this.state.pages;i++){
      data = [];
      data_right = [];
      data_left = [];
      selectedSections = [];
      $.grep(_this.state.sectionData, function(item){
        if(item.page == i){
          selectedSections.push(item.name);
          if(item.column == 1){
            data_right.push(item.name);
          }else{
            data_left.push(item.name);
          }
        }
      });
      if(_this.state.layout_type == "double"){
        key = "double-page"+i;
        data.push(<Double data_right={data_right} data_left={data_left} layoutSections={_this.state.layoutSections} selectedSections={selectedSections} handleRemoveSection={_this.handleRemoveSection} resume={state.resume} key={key} updateResume={_this.updateResume} createSubSection={_this.createSubSection}  removeSubSection={_this.removeSubSection}/>);
      }else{
        _this.state.layoutSections.forEach(function(section) {
          if($.inArray(section, selectedSections) > -1){
            section = section.substr(0,1).toUpperCase()+section.substr(1);
            MyComponent = window[section];
            key = section + "holder"+i;
            data.push(<MyComponent handleRemoveSection={_this.handleRemoveSection} resume={state.resume} key={key} updateResume={_this.updateResume} createSubSection={_this.createSubSection}  removeSubSection={_this.removeSubSection}/>);
          }
        });
      }

      key = "page-"+i;  
      data_1.push(<Page key={key} page_index={i+1} header={header} updateResume={_this.updateResume} page_data={data} createSubSection={_this.createSubSection} removeSubSection={_this.removeSubSection} resumeStyle={_this.state.resume.resume_style}/>);
    };
    return (
      <div className="cv-builder-container">
        <div className="right_col" role="main">
          <div className="clearfix"></div>
          <div className="row">
            {data_1}  
          </div>
        </div>
        <RearrangeModal layout_type={this.state.layout_type} pages={this.state.pages} sectionData={this.state.sectionData} handleRearrage={this.handleRearrage} sections={this.state.layoutSections}/>
        <AddSectionModal handleAddSection={this.handleAddSection} sections={this.state.layoutSections}/>
        <BackgroundModal handleBackground={this.handleBackground} resumeStyle={this.state.resumeStyle}/>
        <FontModal handleFont={this.handleFont} resumeStyle={this.state.resumeStyle}/>
        <ColorModal handleColor={this.handleColor} resumeStyle={this.state.resumeStyle}/>
        <LayoutTypeModal handleLayoutChange={this.handleLayoutChange} currentLayout={this.state.layout_type}/>
      </div>
    )
  }
});