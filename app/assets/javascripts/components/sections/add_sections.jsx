var AddSections = React.createClass({
  handleAddSection: function(e) {
    this.props.handleAddSection(e);
  },
  render: function() {
    var sections = ["Summary", "Achievements", "Awards", "Passions", "Strengths", "Experience", "Projects", "Volunteers", "Education", "Courses", "Certificate", "Quotes", "Languages", "Skills", "Technologies"];
    var data = [];
    var key = "";
    var _this = this;
    sections.forEach(function(section){
      key = "add-"+section;
      if($.inArray(section, _this.props.sections) > -1){
        data.push(<div className="section" key={key} data-section-name={section}>{section}</div>);
      }else{
        data.push(<div className="section" key={key} onClick={_this.handleAddSection} data-section-name={section}>{section}</div>);  
      }
    });
    return (
      <div className="add-section-modal">
        {data}
      </div>
    )
  }
});