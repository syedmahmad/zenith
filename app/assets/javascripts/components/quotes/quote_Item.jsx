var QuoteItem = React.createClass({

  getInitialState: function(){
    var quote = this.props.quote;
    return {name: quote.name};
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
    return (
      <div className="">
        <div id="edit_able" className="hide-section">  
           <a href="javaScript:void(0);">
           <i aria-hidden="true" className="fa fa-plus-circle" onMouseDown={this.props.addSubSection}></i>
           </a>
           <a href="javaScript:void(0);">
           <i aria-hidden="true" className="fa fa-trash" onMouseDown={this.props.removeSubSection} data-section-id={this.props.quote.id}></i>
           </a>
        </div>
        <div className="section-item" data-quote-id={this.props.quote.id}>
          <div className="icon-holder pull-left">
             <i className="fa fa-bolt" aria-hidden="true"></i>
          </div>
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
        </div>
      </div>
    )
  }
});