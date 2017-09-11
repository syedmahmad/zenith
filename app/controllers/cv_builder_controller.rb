class CvBuilderController < ApplicationController

  def index
    flash[:success ] = "Success Flash Message: Welcome to GentellelaOnRails"
    #other alternatives are
    # flash[:warn ] = "Israel don't quite like warnings"
    #flash[:danger ] = "Naomi let the dog out!"
    @resume = get_json
    @sections = ["Achievements", "Courses", "Education"]
  end

  def get_json
    return {  
    "achievements": {  
        "enabled":true,
        "showIcons":true,
        "name":"",
        "column":1,
        "height":48,
        "items":[  
           {  
              "id":0,
              "record":"AchievementItem",
              "icon":"139-free-diamond-01",
              "title":"achievement1",
              "description":"this is my achievement1",
              "showDescription":true,
              "height":76
           },
           {  
              "id":1,
              "record":"AchievementItem",
              "icon":"139-free-diamond-01",
              "title":"achievement2",
              "description":"this is my achievement2",
              "showDescription":true,
              "height":76
           }
        ]
    },
    "language": {  
        "enabled":true,
        "name":"",
        "column":1,
        "showProficiency":false,
        "showSlider":true,
        "indicatorType":"dots",
        "height":48,
        "items":[  
           {  
              "id":0,
              "record":"LanguageItem",
              "name":"English",
              "level":3,
              "levelText":"",
              "height":53
           },
           {  
              "id":1,
              "record":"LanguageItem",
              "name":"Urdu",
              "level":5,
              "levelText":"",
              "height":53
           }
        ]
    },
    "courses": {  
      "enabled":true,
      "name":"",
      "column":0,
      "height":48,
      "items":[  
         {  
            "id":0,
            "record":"CourseItem",
            "title":"First course",
            "description":"this is my first course",
            "height":53,
            "showDescription":false
         },
         {  
            "id":1,
            "record":"CourseItem",
            "title":"2nd course",
            "description":"this is my 2nd course",
            "height":53,
            "showDescription":false
         }
      ]
    },
    "passion": {  
        "enabled":true,
        "showIcons":true,
        "name":"",
        "column":0,
        "height":48,
        "items":[  
           {  
              "id":0,
              "record":"PassionItem",
              "icon":"129-free-heart",
              "title":"Passion 1",
              "height":54,
              "description":"hey passion 1",
              "showDescription":false
           },
           {  
              "id":1,
              "record":"PassionItem",
              "icon":"129-free-heart",
              "title":"passion 2",
              "height":54,
              "description":"hey passion 2",
              "showDescription":false
           }
        ]
    },
    "education": {  
      "enabled":true,
      "name":"",
      "column":0,
      "height":48,
      "items":[  
         {  
          "id":0,
          "record":"EducationItem",
          "degree":"Bachelor of Science (BS CS)",
          "institution":"University of the Punjab, Lahore",
          "location":"",
          "gpa":"4.00",
          "gpaText":"",
          "maxGpa":"3.21",
          "dateRange":{  
             "record":"DateRange",
             "fromYear":2011,
             "fromMonth":"",
             "toMonth":3,
             "toYear":2015,
             "isOngoing":false
          },
          "height":101,
          "bullets":[  
             ""
          ],
          "showGpa":true,
          "showLocation":false,
          "showDateRange":true,
          "showBullets":false
         }
      ]
    },
    "header":{  
     "name":"Syed Muhammad Ahmad",
     "title":"Senior Software Engineer",
     "email":"syedmahmad099@gmail.com",
     "location":"Pakistan Lahore",
     "phone":"+92 334 9998990",
     "link":"",
     "height":182,
     "showTitle":true,
     "showPhone":true,
     "showLink":true,
     "showEmail":true,
     "showLocation":true,
     "uppercaseName":true,
     "showPhoto":true,
     "photoStyle":"rect",
     "photo":"https://enhancv.s3.amazonaws.com/avatars/62cba8a64b54cd2c19f8db5d1d4510a09504e306a72fa429da25125ef41f8048.jpg"
    },
    "layout": {  
      "record":"LayoutItem",
      "sectionIndex":7,
      "page":0,
      "column":0,
      "height":121
    }
  }
  end

end
