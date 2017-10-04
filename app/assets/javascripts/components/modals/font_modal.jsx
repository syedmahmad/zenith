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
      var primary_fonts = this.props.resumeStyle.available_primary_fonts;
      var primary_font = this.props.resumeStyle.primary_font;

      var secondary_fonts = this.props.resumeStyle.available_secondary_fonts;
      var secondary_font = this.props.resumeStyle.secondary_font;

      var font_sizes = this.props.resumeStyle.available_font_sizes;
      var font_size = this.props.resumeStyle.font_size;

      return (
        <div className="modal fade" id="fontModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">Choose Fonts</h4>
              </div>
              <div className="modal-body">
                <div className="font-reorder-page">
                  <div className="row">
                   <h2>Main Font</h2>
                   <div className="col-xs-4 col-sm-4 col-md-4"> 
                    {
                      primary_fonts.map((p_font, index) => (
                        primary_font === p_font
                          ? <p key={index} data-font-name={p_font} data-name="primary_font" onClick={this.changeFont}><div className="color-state-selected"><i className="fa fa-check"></i></div></p>
                          : <p key={index} data-font-name={p_font} data-name="primary_font" onClick={this.changeFont}>{p_font}</p>
                    ))}
                   </div>
                   <h2>Secondary Font</h2>
                   <div className="col-xs-4 col-sm-4 col-md-4"> 
                     {
                       secondary_fonts.map((s_font, index) => (
                         secondary_font === s_font
                           ? <p key={index} data-font-name={s_font} data-name="secondary_font" onClick={this.changeFont}><div className="color-state-selected"><i className="fa fa-check"></i></div></p>
                           : <p key={index} data-font-name={s_font} data-name="secondary_font" onClick={this.changeFont}>{s_font}</p>
                     ))}
                   </div>
                   <h2>Font Size</h2>
                   <div className="col-xs-4 col-sm-4 col-md-4"> 
                     {
                       font_sizes.map((font_s, index) => (
                         font_size === font_s
                           ? <p key={index} data-font-name={font_s} data-name="font_size" onClick={this.changeFont}><div className="color-state-selected"><i className="fa fa-check"></i></div></p>
                           : <p key={index} data-font-name={font_s} data-name="font_size" onClick={this.changeFont}>{font_s}</p>
                     ))}
                   </div>
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
});