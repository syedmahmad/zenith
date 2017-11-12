var DoubleLayoutRearrange = React.createClass({
  render: function() {
    _this = this
    data_left = []
    data_right = []
    right_col_data = _this.props.data_right
    left_col_data = _this.props.data_left
    page = _this.props.page

    sections = _this.props.layoutSections
    selectedSections = this.props.selectedSections

    sections.forEach(function(section) {
      if($.inArray(section, right_col_data) > -1){
        section = section.substr(0,1).toUpperCase()+section.substr(1);
        key = "rearrange" + section + "holder";
        data_right.push(<div className="rearrange-section-item" data-toggle="tooltip" title={section} key={key} data-section-name={section}>{section}</div>);
      }
      else if($.inArray(section, left_col_data) > -1){
        section = section.substr(0,1).toUpperCase()+section.substr(1);
        key = "rearrange" + section + "holder";
        data_left.push(<div className="rearrange-section-item" data-toggle="tooltip" title={section} key={key} data-section-name={section}>{section}</div>);
      }
    });

    return (
      <div>
        {this.props.page == 0 && <div className=" rearrange-header rearrange-section-item" data-toggle="tooltip" title="Header" data-section-name="ResumeHeader">Header</div>}
        <div className="double-column-rearrange">
          <div className="rearrange-resume-col-left connectedSortable">
            {data_left}
          </div>
          <div className="rearrange-resume-col-right connectedSortable">
            {data_right}
          </div>
        </div>
      </div>
    )
  }
});