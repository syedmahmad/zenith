var RearrangePage = React.createClass({
  componentDidMount: function(){
    var _this = this;
    $(".rearrange-section-modal").sortable({
      connectWith: ".connectedSortable",
      stop: function  (event, ui) {
        _this.props.handleRearrange();
      }
    });
  },

  render: function() {
    data = this.props.page_data
    return (
      <div className="reorder-page">
        <div className="rearrange-section-modal connectedSortable">
          {data}
        </div>
      </div> 
    )
  }
});