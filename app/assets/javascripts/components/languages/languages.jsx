var languages = React.createClass({
  render: function() {
    var languages = this.props.resume.languages
    var data = []
    var key = "";
    var _this = this;
    languages.forEach(function(language) {
      key = "language-" + language.id;
      data.push(<LanguageItem language={language} key={key} updateResume={_this.props.updateResume}/>);
    });
    
    return (
     <div className="section-items col-md-12" data-section-name="language" >
        {data}
      </div>
    )
  }
});