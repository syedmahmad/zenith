var Summary = React.createClass({

  getInitialState: function(){
    var summary = this.props.resume.summary;
    return {title: summary.title, description: summary.description};
  },

  handleChange: function(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  },

  submitSummaryData: function(e){
    e.preventDefault();
    this.props.updateResume(
      {summary: {title: this.state.title, description: this.state.description}}
    );
  },

  handleRemoveSection: function(e){
    this.props.handleRemoveSection(e);
  },

  render: function() {
    return (
      <section className="summary-holder">
         <div id="edit_able" className="ember-view section-menu">  <a href="javaScript:void(0);" title="Add a new item">
            <i aria-hidden="true" className="fa fa-plus-circle"></i>
            </a>
            <a href="javaScript:void(0);" title="Remove section">
            <i aria-hidden="true" className="fa fa-trash" onClick={this.handleRemoveSection} data-section-name="summary"></i>
            </a>
            <a className="move-section" href="javaScript:void(0);" title="Move section">
            <i aria-hidden="true" className="fa fa-arrows"></i>
            </a>
         </div>
         <div className="heading-area">
            <h3>
               <div className="form-group">
                  <input
                    type="string"
                    name="title"
                    className="form-control"
                    placeholder="SUMMARY"
                    value={this.state.title}
                    onChange={ this.handleChange}
                  />
               </div>
            </h3>
         </div>
         <div className="form-group">
            <input
              type="string"
              name="description"
              className="form-control"
              placeholder="What critical problems are you well positioned to solve? A bit about yourself"
              value={this.state.description}
              onChange={ this.handleChange}
            />
         </div>
         <div className="divider"></div>
      </section>
    )
  }
});