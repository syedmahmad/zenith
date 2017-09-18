var RearrangeSections = React.createClass({
  componentDidMount: function(){
    var _this = this;
    $(".rearrange-section-modal").sortable({
      stop: function  (event, ui) {
        _this.handleRearrange();
      }
    });
  },

  handleRearrange: function() {
    this.props.handleRearrange();
  },
  render: function() {
    var sections = this.props.sections;
    var sectionsHash = {"Achievements":{height: "180px", width: "100px", backgroundColor: "red", color: "#fff"}, "Courses":{height: "180px", width: "90px", backgroundColor: "blue", color: "#fff"}, "Education":{height: "180px", width: "130px", backgroundColor: "black", color: "#fff"}};
    var data = [];
    var key = "";
    var _this = this;

    sections.forEach(function(section) {
      key = "rearrange-"+section;
      var v = sectionsHash[section]
      data.push(<div style={v} className="rearrange-section-item" data-toggle="tooltip" title={section} key={key} data-section-name={section}>{section}</div>);
    });

    return (
      <div className="rearrange-section-modal">
        {data}
      </div>
    )
  }
});