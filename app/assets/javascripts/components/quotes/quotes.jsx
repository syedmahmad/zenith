var Quotes = React.createClass({
  getInitialState: function(){
    return {quote_header: "QUOTES", quotes: this.props.resume.quotes};
  },
  handleChange: function(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  },
  handleRemoveSection: function(e){
    e.preventDefault();
    this.props.handleRemoveSection(e);
  },
  componentDidMount: function(){
    var _this = this;
    var show_hide_section_clicked = false;
    $(document).on('focusin', ".section-item", (function (e) {
      this.firstChild.classList.remove('hide-section');
    }));
    $(document).on('focusout', ".section-item", (function (e) {
      e.preventDefault();
      if($('.show_hide_section').hasClass("hovered")){
        show_hide_section_clicked = true;
        $(e.target).closest(".section-item").find(".hide-show-control").attr('tabindex',-1).focus();
      }else{
        show_hide_section_clicked = false;
      }
      
      if(!show_hide_section_clicked) {
        $(this).find(".show_hide_section").hide()
        this.firstChild.classList.add('hide-section');

        var state_res = _this.state.quotes.find(item => item.id == $(this).data("quoteId"));
        if (state_res) {
          var props_res = _this.props.resume.quotes.find(item => item.id == $(this).data("quoteId"));
          if (props_res && props_res[e.target.name] != e.target.value) {
            //send update call...
            _this.submitQuote({[e.target.name]: e.target.value, "id": $(this).data("quoteId")});
          }
        }
      }
    }));

   // show and hide buttons
    $(document).on('focusin', ".heading-area", (function (e) {
      this.parentElement.previousElementSibling.classList.remove('hide-section');
    })); 
    $(document).on('focusout', ".heading-area", (function (e) {
      this.parentElement.previousElementSibling.classList.add('hide-section');
    }));

  },
  submitQuote: function(params){
    this.props.updateResume(
      {resume: {quotes_attributes: {"1": params}}}
    );
  },    
  addSubSection: function(e){
    e.preventDefault();
    var formData = {sub_section_name:"Quote"};
    //updating current state from parent
    this.props.createSubSection(formData, "quotes");
  },
  removeSubSection: function(e){  
    e.preventDefault();
    var formData = {section_id: $(e.target).data("sectionId"), sub_section_name:"Quote"};
    //updating current state from parent
    this.props.removeSubSection(formData, "quotes");
  },
  render: function() {
    var data = []
    var key = "";
    var _this = this;
    var page = _this.props.page;
    var quotes = _this.props.resume.quotes;
    quotes.forEach(function(quote) {
      if(page == quote.page){
        key = "quote-" + quote.id;
        data.push(<QuoteItem total= {quotes.length} handleShowHideChange={_this.props.handleShowHideChange} quote={quote} key={key} removeSubSection={_this.removeSubSection} addSubSection={_this.addSubSection} updateResume={_this.props.updateResume}/>);
      }
    });
    
    return (
     <div className="section-items col-md-12 p0" data-section-name="Quotes" >
        <div id="edit_able" className="hide-section">  
           <a href="javaScript:void(0);">
           <i aria-hidden="true" className="fa fa-plus-circle" onMouseDown={this.addSubSection}></i>
           </a>
           <a href="javaScript:void(0);">
           <i aria-hidden="true" className="fa fa-trash" onMouseDown={this.handleRemoveSection} data-section-name="Quotes"></i>
           </a>
        </div>
        <section className="section-items-holder">           
           <div className="heading-area" onFocus={this.showButtons} onBlur={this.hideButtons}>
              <h3>
                 <div className="form-group">
                    <input
                      type="string"
                      name="quote_header"
                      className="form-control primary_font"
                      placeholder="QUOTES"
                      value={this.state.quote_header}
                      onChange={ this.handleChange }
                    />
                 </div>
              </h3>
           </div>
          <div className="section-items-list">
              <ul className="row mrl0">
                {data}
              </ul>
           </div>
        </section>
      </div>
    )
  }
});