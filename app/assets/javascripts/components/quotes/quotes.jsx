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
    $(document).on('focusin', ".section-item", (function (e) {
      this.previousElementSibling.classList.remove('hide-section');
    }));
    $(document).on('focusout', ".section-item", (function (e) {
      this.previousElementSibling.classList.add('hide-section');
      // if(_this.props.achievement[e.target.name] != e.target.value){
      _this.submitQuote({[e.target.name]: e.target.value, id: $(this).data("quoteId")});
        // _this.props.achievement[e.target.name] = e.target.value;
      // }
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
    var id=1;
    if (this.state.quotes.length>0) {
      id = this.state.quotes[this.state.quotes.length-1].id + 1;
    }
    var quote = {id:id, name:''};
    this.state.quotes.push(quote);
    this.setState({quotes: this.state.quotes});
  },
  removeSubSection: function(e){  
    e.preventDefault();
    var obj_to_remove = this.state.quotes.find(item => item.id === $(e.target).data("sectionId"));
    if (obj_to_remove) {
      this.setState({quotes: this.state.quotes.filter(item => item.id !== obj_to_remove.id)});    
    }
  },
  render: function() {
    var quotes = this.props.resume.quotes
    var data = []
    var key = "";
    var _this = this;
    quotes.forEach(function(quote) {
      key = "quote-" + quote.id;
      data.push(<QuoteItem quote={quote} key={key} removeSubSection={_this.removeSubSection} addSubSection={_this.addSubSection} updateResume={_this.props.updateResume}/>);
    });
    
    return (
     <div className="section-items col-md-12" data-section-name="quote" >
        <div id="edit_able" className="hide-section">  
           <a href="javaScript:void(0);">
           <i aria-hidden="true" className="fa fa-plus-circle" onMouseDown={this.addSubSection}></i>
           </a>
           <a href="javaScript:void(0);">
           <i aria-hidden="true" className="fa fa-trash" onMouseDown={this.handleRemoveSection} data-section-name="quotes"></i>
           </a>
        </div>
        <section className="achievement-holder">           
           <div className="heading-area" onFocus={this.showButtons} onBlur={this.hideButtons}>
              <h3>
                 <div className="form-group">
                    <input
                      type="string"
                      name="quote_header"
                      className="form-control"
                      placeholder="QUOTES"
                      value={this.state.quote_header}
                      onChange={ this.handleChange }
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