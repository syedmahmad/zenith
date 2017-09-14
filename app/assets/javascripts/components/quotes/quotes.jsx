var Quotes = React.createClass({
  render: function() {
    var quotes = this.props.resume.quotes
    var data = []
    var key = "";
    var _this = this;
    quotes.forEach(function(quote) {
      key = "quote-" + quote.id;
      data.push(<QuoteItem quote={quote} key={key} updateResume={_this.props.updateResume}/>);
    });
    
    return (
     <div className="section-items col-md-12" data-section-name="quote" >
        {data}
      </div>
    )
  }
});