var RearrangePageDoubleLayout = React.createClass({
  componentDidMount: function(){
    var _this = this;
    $(".rearrange-resume-col-left, .rearrange-resume-col-right").sortable({
      connectWith: ".connectedSortable",
      stop: function  (event, ui) {
        _this.props.handleRearrange();
      }
    });
  },

  render: function() {
    data = this.props.page_data
    return (
      <div className="reorder-page" data-page={this.props.page}>
        <div className="rearrange-section-modal connectedSortable">
          {data}
        </div>
      </div> 
    )
  }
});