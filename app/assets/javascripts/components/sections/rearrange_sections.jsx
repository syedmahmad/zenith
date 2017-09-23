var RearrangeSections = React.createClass({
  getInitialState: function() {
    return {layoutSections: this.props.sections};
  },

  handleRearrange: function() {
    this.props.handleRearrange();
  },
  render: function() {
    pages = this.props.pages
    sectionData = this.props.sectionData
    layoutSections = this.props.sections

    var sectionsHash = {"Achievements":{height: "180px", width: "100px", backgroundColor: "red", color: "#fff"}, "Courses":{height: "180px", width: "90px", backgroundColor: "blue", color: "#fff"}, "Education":{height: "180px", width: "130px", backgroundColor: "black", color: "#fff"}};
    var data = [];
    var data_1 = []
    var key = "";
    var _this = this;

    for(i=0;i<pages;i++){
      data = [];
      selectedSections = [];
      $.grep(sectionData, function(item){
        if(item.page == i){
          selectedSections.push(item.name);
        }
      });

      layoutSections.forEach(function(section) {
        if($.inArray(section, selectedSections) > -1){
          section = section.substr(0,1).toUpperCase()+section.substr(1);
          key = "rearrange" + section + "holder"+i;
          data.push(<div className="rearrange-section-item" data-toggle="tooltip" title={section} key={key} data-section-name={section}>{section}</div>);
        }
      });
      key = "rearrange-page-"+i;  
      data_1.push(<RearrangePage key={key} page={i} handleRearrange={this.props.handleRearrange} page_index={i+1} page_data={data} />);
    };

    // sections.forEach(function(section) {
    //   key = "rearrange-"+section;
    //   var v = sectionsHash[section]
    //   data.push(<div className="rearrange-section-item" data-toggle="tooltip" title={section} key={key} data-section-name={section}>{section}</div>);
    // });

    return (
      <div className="reorder-page-container">
        {data_1}
      </div>
    )
  }
});