var AddSections = React.createClass({
  handleOnClick: function(e) {
    alert($(e.target).data("sectionName"));
  },
  render: function() {
    var sections = ["Summary", "Achievements", "Awards", "Passions", "Strengths", "Experience", "Projects", "Volunteer", "Education", "Publications", "Cources", "Certificates", "Quotes", "Languages", "Skills", "Technologies", "Books"];
    var data = [];
    var key = "";
    var _this = this;
    sections.forEach(function(section){
      key = "add-"+section;
      data.push(<div className="section" key={key} onClick={_this.handleOnClick} data-section-name={section}>{section}</div>);
    });
    return (
      <div className="add-section-modal">
        {data}
      </div>
    )
  }
});