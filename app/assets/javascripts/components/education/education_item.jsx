var EducationItem = React.createClass({
  render: function() {
    var education_item = this.props.education_item;
    return (
      <div className="section-item">
        <h2>{education_item.degree}</h2>
        <p>{education_item.institution}</p> 
      </div>
    )
  }
});