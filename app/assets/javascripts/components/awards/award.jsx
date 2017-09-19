var Awards = React.createClass({
  handleRemoveSection: function(e){
    debugger;
    this.props.handleRemoveSection(e);
  },
  render: function() {
    var awards = this.props.resume.awards
    var data = []
    var key = "";
    var _this = this;
    awards.forEach(function(award) {
      key = "award-" + award.id;
      data.push(<AwardItem award={award} key={key} updateResume={_this.props.updateResume}/>);
    });
    
    return (
     <div className="section-items col-md-12" data-section-name="award" >
        <section className="summary-holder">
           <div id="edit_able" className="ember-view section-menu">  <a href="javaScript:void(0);" title="Add a new item">
              <i aria-hidden="true" className="fa fa-plus-circle"></i>
              </a>
              <a href="javaScript:void(0);" title="Remove section">
              <i aria-hidden="true" className="fa fa-trash" onClick={this.handleRemoveSection} data-section-name="awards"></i>
              </a>
              <a className="move-section" href="javaScript:void(0);" title="Move section">
              <i aria-hidden="true" className="fa fa-arrows"></i>
              </a>
           </div>
           <div className="heading-area" onFocus={this.showButtons} onBlur={this.hideButtons}>
              <h3>
                 <div className="form-group">
                    <input
                      type="string"
                      name="achievement_header"
                      className="form-control"
                      placeholder="AWARDS"
                     
                    />
                 </div>
              </h3>
           </div>
          {data}
        </section>
      </div>
    )
  }
});