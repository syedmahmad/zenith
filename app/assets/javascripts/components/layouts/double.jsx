var Double = React.createClass({
  render: function() {
    _this = this
    data_left = []
    data_right = []
    page = _this.props.page;
    right_col_data = _this.props.data_right
    left_col_data = _this.props.data_left

    sections = _this.props.layoutSections
    selectedSections = this.props.selectedSections
    sections.forEach(function(section) {
      if($.inArray(section, right_col_data) > -1){
        section = section.substr(0,1).toUpperCase()+section.substr(1);
        MyComponent = window[section];
        key = section + "holder"+i;
        data_right.push(<MyComponent page={page} updateStyle={_this.props.updateStyle} setupLayout={_this.props.setupLayout} handleShowHideChange={_this.props.handleShowHideChange} handleRemoveSection={_this.props.handleRemoveSection} resume={_this.props.resume} key={key} updateResume={_this.props.updateResume}
                  updateResumeState={_this.props.updateResumeState} createSubSection={_this.props.createSubSection}  removeSubSection={_this.props.removeSubSection}/>);
      }else if($.inArray(section, left_col_data) > -1){
        section = section.substr(0,1).toUpperCase()+section.substr(1);
        MyComponent = window[section];
        key = section + "holder"+i;
        data_left.push(<MyComponent page={page} updateStyle={_this.props.updateStyle} setupLayout={_this.props.setupLayout} handleShowHideChange={_this.props.handleShowHideChange} handleRemoveSection={_this.props.handleRemoveSection} resume={_this.props.resume} key={key} updateResume={_this.props.updateResume} 
                  updateResumeState={_this.props.updateResumeState} createSubSection={_this.props.createSubSection}  removeSubSection={_this.props.removeSubSection}/>);
      }
    });

    return (
      <div>
        <div className="resume-col-left">
          {data_left}
        </div>
        <div className="resume-col-right">
          {data_right}
        </div>
      </div>
    )
  }
});