var RearrangePage = React.createClass({
  componentDidMount: function(){
    var _this = this;
    $(".rearrange-section-modal").sortable({
      connectWith: ".connectedSortable",
      stop: function  (event, ui) {
        _this.props.handleRearrange();
      }
    });
    $(".rearrange-section-modal").disableSelection();
  },

  render: function() {
    data = this.props.page_data
    return (
      <div className="reorder-page" data-page={this.props.page}>
      {this.props.page == 0 && <div className="single-layout rearrange-section-item" data-toggle="tooltip" title="Header" data-section-name="ResumeHeader">Header</div>}
        <div className="rearrange-section-modal connectedSortable">
          {data}
        </div>
      </div> 
    )
  }
});