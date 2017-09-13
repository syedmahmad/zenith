var Award = React.createClass({
  render: function() {
    var awards = this.props.resume["award"]["items"]
    var data = []
    var key = "";
    var _this = this;
    awards.forEach(function(award) {
      key = "award-" + award.id;
      data.push(<AwardItem award={award} key={key} updateResume={_this.props.updateResume}/>);
    });
    
    return (
     <div className="section-items col-md-12" data-section-name="award" >
        {data}
      </div>
    )
  }
});