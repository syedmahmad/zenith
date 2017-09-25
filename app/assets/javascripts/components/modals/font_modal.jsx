var FontModal = React.createClass({
    getInitialState: function() {
      return { isModalOpen: true };
    },

    openModal: function() {
      this.setState({ isModalOpen: true });
    },

    closeModal: function() {
      this.setState({ isModalOpen: false });
    },

    changeFont: function(e){
      this.props.handleFont(e);
    },

    render: function() {
      var fonts = this.props.resumeStyle.available_fonts
      return (
        <div className="modal fade" id="fontModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">Rearrange</h4>
              </div>
              <div className="modal-body">
                <div className="font-reorder-page">
                  {
                    fonts.map((font, index) => (
                      <p key={index} data-font-name={font} onClick={this.changeFont}>{font}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
});