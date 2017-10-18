var RearrangePage = React.createClass({
  componentDidUpdate: function(){
    var _this = this;
    var uiItem = null;
    $(".rearrange-section-modal").sortable({
      connectWith: ".connectedSortable",
      start: function( event, ui ) {
        uiItem = ui.item;
      },
      stop: function  (event, ui) {
        _this.props.handleRearrange(uiItem);
      }
    });
    $(".rearrange-section-modal").disableSelection();
  },

  componentDidMount: function(){
    var _this = this;
    var uiItem = null;
    $(".rearrange-section-modal").sortable({
      connectWith: ".connectedSortable",
      start: function( event, ui ) {
        uiItem = ui.item;
      },
      stop: function  (event, ui) {
        _this.props.handleRearrange(uiItem);
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