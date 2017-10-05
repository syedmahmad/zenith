var QuoteItem = React.createClass({

  getInitialState: function(){
    var quote = this.props.quote;
    return {quote: quote, name: quote.name};
  },

   handleChange: function(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  },

  submitquote: function(e){
    e.preventDefault();
    this.props.updateResume(
      {quote: {name: this.state.name}}
    );
  },

  render: function() {
    optionsArr = ["show_author"]
    showHideOptions = <ShowHideOptions handleShowHideChange={this.props.handleShowHideChange} model={this.state.quote} section="quotes" sectionId={this.state.quote.id} options={optionsArr}/>
    return (
      <div className="">
        <div className="section-item col-xs-12" data-quote-id={this.props.quote.id}>
          <div id="edit_able" className="hide-section">  
             <a href="javaScript:void(0);">
             <i aria-hidden="true" className="fa fa-plus-circle" onMouseDown={this.props.addSubSection}></i>
             </a>
             <a href="javaScript:void(0);">
             <i aria-hidden="true" className="fa fa-trash" onMouseDown={this.props.removeSubSection} data-section-id={this.props.quote.id}></i>
             </a>
          </div>
          {showHideOptions}
          <div className="form-group">
            <input
              type="string"
              name="name"
              className="form-control"
              placeholder="Quote"
              value={this.state.name}
              onChange={ this.handleChange }
            />
          </div>
          
          { this.state.quote.show_author && <div className="form-group">
            <input
              type="string"
              name="name"
              className="form-control"
              placeholder="Quote"
              value={this.state.author}
              onChange={ this.handleChange }
            />
          </div>}
        </div>
      </div>
    )
  }
});