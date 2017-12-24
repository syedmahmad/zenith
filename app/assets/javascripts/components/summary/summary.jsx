var Summary = React.createClass({

  getInitialState: function(){
    var summary = this.props.resume.summary;
    return {title: summary.title, description: summary.description};
  },

  handleChange: function(e){
    e.preventDefault();

    var resume = this.props.resume;
    var itemsObj = null;
    var subSectionId = $(e.target).closest(".summary-holder").data("summaryId");
    itemsObj = resume["summary"];
    itemsObj[e.target.name] = e.target.value;
    resume["summary"] = itemsObj;
    this.props.resume = resume;

    this.setState({[e.target.name]: e.target.value});
  },

  handleRemoveSection: function(e){
    this.props.handleRemoveSection(e);
  },

  componentDidUpdate: function(){
    this.adjustTextFields();
    this.props.setupLayout();
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
      if (e.target.value != "") {
        _this.submitSummary({[e.target.name]: e.target.value, "id": $(this).data("summaryId")});
      }
    }));
    this.adjustTextFields();
  },

  adjustTextFields: function(){
    $.each($(".summary-holder textarea"), function(index, el){
      $(el).height(el.scrollHeight+"px");
    });
  },
  
  submitSummary: function(params){
    this.props.updateResume(
      {resume: {summary_attributes: params}}
    );
  },   

  render: function() {
    return (
      <div className="section-items col-md-12 p0" data-section-name="Summary">
        <section className="summary-holder" data-summary-id={this.props.resume.summary.id}>
           <div id="edit_able" className="hide-section">
              <a href="javaScript:void(0);" title="Remove section">
              <i aria-hidden="true" className="fa fa-trash" onMouseDown={this.handleRemoveSection} data-section-name="Summary"></i>
              </a>
           </div>
           <section className="section-items-holder">
             <div className="heading-area">
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
             </div>
           </section>
           <div className="form-group">
              <textArea id="textarea"
                type="string"
                name="description"
                className="form-control"
                placeholder="What critical problems are you well positioned to solve?"
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