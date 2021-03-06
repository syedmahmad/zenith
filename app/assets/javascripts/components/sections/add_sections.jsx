var AddSections = React.createClass({
  handleAddSection: function(e) {
    this.props.handleAddSection(e);
  },
  render: function() {
    var sections = ["Summary", "Achievements", "Awards", "Passions", "Strengths", "Experiences", "Projects", "Volunteers", "Education", "Courses", "Certificates", "Quotes", "Languages", "Skills", "Technologies"];
    var data = [];
    var key = "";
    var _this = this;
    sections.forEach(function(section){
      key = "add-"+section;
      if($.inArray(section, _this.props.sections) > -1){
        data.push(<div className="section added" key={key} data-section-name={section}>{section}</div>);
      }else{
        data.push(<div className="section" key={key} onClick={_this.handleAddSection} data-section-name={section}>{section}</div>);  
      }
    });
    return (
      <div className="add-section-modal">
        <div className="add-sections-holder col-lg-8">
          {data}
        </div>
        <div className="section-description col-lg-4">
          <h2></h2>
          <p></p>
        </div>
      </div>
    )
  }
});