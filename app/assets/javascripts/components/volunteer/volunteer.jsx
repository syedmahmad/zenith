var volunteers = React.createClass({
  render: function() {
    var volunteers = this.props.resume.volunteers
    var data = []
    var key = "";
    var _this = this;
    volunteers.forEach(function(volunteer) {
      key = "volunteer-" + volunteer.id;
      data.push(<VolunteerItem volunteer={volunteer} key={key} updateResume={_this.props.updateResume}/>);
    });
    
    return (
     <div className="section-items col-md-12" data-section-name="volunteers" >
        {data}
      </div>
    )
  }
});