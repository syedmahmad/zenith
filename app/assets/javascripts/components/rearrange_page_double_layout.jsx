var RearrangePageDoubleLayout = React.createClass({
  componentDidMount: function(){
    var _this = this;
    var uiItem = null;
    $(".rearrange-resume-col-left, .rearrange-resume-col-right").sortable({
      connectWith: ".connectedSortable",
      start: function( event, ui ) {
        uiItem = ui.item;
      },
      stop: function  (event, ui) {
        _this.props.handleRearrange(uiItem);
      }
    });
    $(".rearrange-resume-col-left, .rearrange-resume-col-right").disableSelection();
  },

  render: function() {
    data = this.props.page_data
    return (
      <div className="reorder-page" data-page={this.props.page}>
        <div className="rearrange-section-modal">
          {data}
        </div>
      </div> 
    )
  }
}); 