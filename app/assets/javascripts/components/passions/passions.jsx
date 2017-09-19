var Passions = React.createClass({
  render: function() {
    var passions = this.props.resume.passions
    var data = []
    var key = "";
    var _this = this;
    passions.forEach(function(passion) {
      key = "passion-" + passion.id;
      data.push(<PassionItem passion={passion} key={key} updateResume={_this.props.updateResume}/>);
    });
    
    return (
     <div className="section-items col-md-12" data-section-name="passion" >
        {data}
      </div>
    )
  }
});