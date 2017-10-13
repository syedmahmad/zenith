var Summary = React.createClass({

  getInitialState: function(){
    var summary = this.props.resume.summary;
    return {title: summary.title, description: summary.description};
  },

  handleChange: function(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  },

  handleRemoveSection: function(e){
    this.props.handleRemoveSection(e);
  },

  componentDidMount: function(){
    var _this = this;
    // show setting and camera buttons
    $(document).on('focusin', ".summary-holder", (function (e) {
      this.firstChild.classList.remove('hide-section');
    }));
    // hide setting and camera buttons
    $(document).on('focusout', ".summary-holder", (function (e) {
      this.firstChild.classList.add('hide-section');
      if (e.target.value != _this.props.resume.summary[e.target.name]) {
        _this.submitSummary({[e.target.name]: e.target.value, "id": $(this).data("summaryId")});
      }
    }));
  },

  submitSummary: function(params){
    this.props.updateResume(
      {resume: {summary_attributes: params}}
    );
  },   

  render: function() {
    return (
      <div className="section-items col-md-12" data-section-name="Summary">
        <section className="summary-holder" data-summary-id={this.props.resume.summary.id}>
           <div id="edit_able" className="hide-section">
              <a href="javaScript:void(0);" title="Remove section">
              <i aria-hidden="true" className="fa fa-trash" onMouseDown={this.handleRemoveSection} data-section-name="Summary"></i>
              </a>
           </div>
           <section className="section-items-holder">
             <div className="heading-area">
                <h3>
                   <div className="form-group">
                      <input
                        type="string"
                        name="title"
                        className="form-control primary_font"
                        placeholder="SUMMARY"
                        value={this.state.title}
                        onChange={ this.handleChange}
                      />
                   </div>
                </h3>
             </div>
           </section>
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

      </div>
    )
  }
});