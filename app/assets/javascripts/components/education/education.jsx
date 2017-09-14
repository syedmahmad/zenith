var Education = React.createClass({
  render: function() {
    var education = this.props.resume.education
    var data = []
    var key = "";
    var _this = this;
    education.forEach(function(education_item) {
      key = "education-" + education_item.id;
      data.push(<EducationItem education_item={education_item} key={key}/>);
    });
    
    return (
     <div className="section-items col-md-12" data-section-name="Education">
        {data}
      </div>
    )
  }
});