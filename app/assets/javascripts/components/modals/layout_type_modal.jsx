var LayoutTypeModal = React.createClass({
    getInitialState: function() {
      return { isModalOpen: true };
    },

    openModal: function() {
      this.setState({ isModalOpen: true });
    },

    closeModal: function() {
      this.setState({ isModalOpen: false });
    },

    handleLayoutChange: function(e){
      this.props.handleLayoutChange(e);
    },

    render: function() {
      var currentLayout = this.props.currentLayout
      var checked = this.props.underline
      return (
        <div className="modal fade" id="layoutTypeModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">Templates</h4>
              </div>
              <div className="modal-body">
                <div className="layout-type-modal">
                  <div className="template-holder" style={{display: 'inline-flex'}}>
                    {
                      currentLayout === 'double' ?
                      <div>
                        <div className="template" data-layout-type="double" onClick={this.handleLayoutChange}>
                          <div className="active"> Active </div>
                           <div className="icon-holder">
                              <i className="fa fa-columns fa-3x"></i>
                              <p>Double</p>
                           </div>
                         </div>
                         <div className="template" data-layout-type="single" onClick={this.handleLayoutChange}>
                           <div className="icon-holder">
                              <i className="fa fa-bars fa-3x"></i>
                              <p>Single</p>
                           </div>
                        </div>
                      </div> :
                      <div> 
                        <div className="template" data-layout-type="double" onClick={this.handleLayoutChange}>
                          <div className="icon-holder">
                            <i className="fa fa-columns fa-3x"></i>
                            <p>Double</p>
                          </div>
                        </div>
                        <div className="template" data-layout-type="single" onClick={this.handleLayoutChange}>
                           <div className="active">Active</div>
                           <div className="icon-holder">
                              <i className="fa fa-bars fa-3x"></i>
                              <p>Single</p>
                           </div>
                        </div>
                      </div>}
                      <div style={{ marginTop: '46px', padding: '10px'}}>
                        <span className="toggle-holder">
                          <label className="switch">
                            <input type="checkbox" onChange={this.props.handleUnderlineChange} name="underline" type="checkbox" checked={checked} data-toggle="toggle"/>
                            <span className="slider round"></span>
                          </label>
                        </span>
                        <p>underline</p>
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