var AddSectionModal = React.createClass({
    getInitialState: function() {
      return { isModalOpen: true };
    },
    componentDidMount: function(){
      sectionsDetails = {"Summary": {"title": "Summary", "description": "Here you can tell a little bit about yourself in few lines."},
        "Achievements": {"title": "Achievements", "description": "List your professional achievements."},
        "Awards": {"title": "Awards", "description": "What awards have you received for doing that extra effort?"},
        "Passions": {"title": "Passions", "description": "List the things you are passionate about."},
        "Strengths": {"title": "Strengths", "description": "List your unique talents."},
        "Experiences": {"title": "Experience", "description": "All the experience you have obtained from any kind of employment"},
        "Projects": {"title": "Projects", "description": "Interesting projects you have been part of."},
        "Volunteers": {"title": "Volunteer", "description": "List your experiences as volunteer."},
        "Education": {"title": "Education", "description": "Where have you studied?"},
        "Courses": {"title": "Courses", "description": "List the courses/workshops you have taken."},
        "Certificates": {"title": "Certificates", "description": "Are you certified on certain topic? This is the place to list it."},
        "Quotes": {"title": "Quotes", "description": "Your favorite quotes from all the time."},
        "Languages": {"title": "Languages", "description": "What languages do you know?Skills"},
        "Skills": {"title": "Skills", "description": "Any relevant skill for getting the job done?"},
        "Technologies": {"title": "Technologies", "description": "Group the technologies you have experience with."}
      }
      $(".add-section-modal .section").hover(function(){
        section = $(this).data('sectionName')
        title = sectionsDetails[section]["title"]
        desc = sectionsDetails[section]["description"]
        $(".add-section-modal .section-description h2").html(title)
        $(".add-section-modal .section-description p").html(desc)
      },function(){
        $(".add-section-modal .section-description h2").html("")
        $(".add-section-modal .section-description p").html("")
      })
    },
    openModal: function() {
      this.setState({ isModalOpen: true });
    },

    closeModal: function() {
      this.setState({ isModalOpen: false });
    },
    handleAddSection: function(e){
      this.props.handleAddSection(e);
    },
    render: function() {
      var sections = <AddSections handleAddSection={this.handleAddSection} sections={this.props.sections}/>;
      return (
        <div className="modal fade" id="addSectionModal" role="dialog">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">Add Section</h4>
              </div>
              <div className="modal-body">
                {sections}
              </div>
            </div>
            
          </div>
        </div>
      );
    }
});