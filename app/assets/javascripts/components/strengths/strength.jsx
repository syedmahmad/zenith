var Strength = React.createClass({
  render: function() {
    var strengths = this.props.resume["strength"]["items"]
    var data = []
    var key = "";
    var _this = this;
    strengths.forEach(function(strength) {
      key = "strength-" + strength.id;
      data.push(<StrengthItem strength={strength} key={key} updateResume={_this.props.updateResume}/>);
    });
    
    return (
     <div className="section-items col-md-12" data-section-name="strength" >
        {data}
      </div>
    )
  }
});